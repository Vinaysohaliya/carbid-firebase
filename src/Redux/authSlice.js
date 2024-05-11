import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {  doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';




const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
};


export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const { email, password, name, role } = data;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: name,
            role: role
        });
        userCredential.user.displayName = name;
        return {
            user: userCredential.user,
            name: name,
            role: role
        };
    } catch (error) {
        throw error;
    }
});


export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const { email, password } = data;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            userCredential.user.displayName = userData.name;

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
