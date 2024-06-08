import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';




const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
};


export const createAccount = createAsyncThunk("/auth/signup", async ({ email, password, name, role, profilePic }) => {
    try {
        console.log(email,password,profilePic,role,name);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        let profilePicURL = null;
        if (profilePic) {
            const profilePicRef = ref(storage, `profile_pics/${userCredential.user.uid}`);
            const snapshot = await uploadBytes(profilePicRef, profilePic);
            profilePicURL = await getDownloadURL(snapshot.ref);
        }

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: name,
            role: role,
            profilePicURL: profilePicURL
        });


        userCredential.user.displayName = name;

        return {
            user: userCredential.user,
            name: name,
            email: email,
            role: role,
            profilePicURL: profilePicURL
        };
    } catch (error) {
        throw error;
    }
});



export const updateProfile = createAsyncThunk('/auth/updateProfile', async ({ uid, name, role, profilePic }) => {
    try {
        console.log(uid,name,role,profilePic);
        const userDocRef = doc(db, 'users', uid);
        let profilePicURL = null;

        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            throw new Error('User not found');
        }
        const userData = userDocSnap.data();

        if (userData.profilePicURL) {
            const oldProfilePicRef = ref(storage, userData.profilePicURL);
            await deleteObject(oldProfilePicRef);
        }

        if (profilePic) {
            const profilePicRef = ref(storage, `profile_pics/${uid}`);
            const snapshot = await uploadBytes(profilePicRef, profilePic);
            profilePicURL = await getDownloadURL(snapshot.ref);
        }

        const updateData = { name, role };
        if (profilePicURL) updateData.profilePicURL = profilePicURL;

        await updateDoc(userDocRef, updateData);

        return { uid, name, role, profilePicURL };
    } catch (error) {
        throw error;
    }
});


export const getProfile = createAsyncThunk('/auth/getProfile', async (uid) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            return userDocSnap.data();
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        throw error;
    }
})


export const login = createAsyncThunk('/auth/login', async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            userCredential.user.displayName = userData.name;
            console.log(userData);
            return { user: userCredential.user, role: userData };
        } else {
            return { user: userCredential.user, userData: null };
        }
    } catch (error) {
        throw error;
    }
});


export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
});

// Redux slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.role.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.role.role

            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.role
            });
    }
});

export default authSlice.reducer;
