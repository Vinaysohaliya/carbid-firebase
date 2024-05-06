import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assuming you have initialized Firebase Firestore
import { createSlice } from '@reduxjs/toolkit';


// Thunk to post a new comment/question
export const postComment = createAsyncThunk(
  'auctions/postComment',
  async ({ auctionId, userId, content }, thunkAPI) => {
    try {
      await addDoc(collection(db, `auctions/${auctionId}/comments`), { userId, content });
      return { auctionId, userId, content };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to post a reply to a comment/question
export const postReply = createAsyncThunk(
  'auctions/postReply',
  async ({ auctionId, commentId, userId, content }, thunkAPI) => {
    try {
      await setDoc(doc(db, `auctions/${auctionId}/comments/${commentId}/replies`, userId), { content });
      return { auctionId, commentId, userId, content };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch comments/questions for a specific auction
export const fetchComments = createAsyncThunk(
  'auctions/fetchComments',
  async (auctionId, thunkAPI) => {
    try {
      const commentsSnapshot = await getDocs(collection(db, `auctions/${auctionId}/comments`));
      const comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReply.fulfilled, (state, action) => {
        state.loading = false;
        // Update the comment with the reply in the state
        const commentIndex = state.comments.findIndex(comment => comment.id === action.payload.commentId);
        if (commentIndex !== -1) {
          state.comments[commentIndex].replies = action.payload.replies;
        }
      })
      .addCase(postReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
