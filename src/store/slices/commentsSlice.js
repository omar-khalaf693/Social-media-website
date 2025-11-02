import js from "@eslint/js";
import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: "comments",
    initialState:{
        comments: JSON.parse(localStorage.getItem("comments")) || [],
    },
    reducers: {
        storeComments: (state, action) => {
            state.comments = action.payload;
            localStorage.setItem("comments", JSON.stringify(state.comments));
        },  
        addComment: (state, action) => {
            const { postId, userId ,comment} = action.payload;
            state.comments.push({ postId, userId, comment});
            localStorage.setItem("comments", JSON.stringify(state.comments));
        },
    }
})
export const { storeComments, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;