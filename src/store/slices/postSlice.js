import js from "@eslint/js";
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: JSON.parse(localStorage.getItem("posts")) || [],
    userReactions: JSON.parse(localStorage.getItem("userReactions")) || [],
  },
  reducers: {
    StorePosts: (state, action) => {
      state.posts = action.payload;
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    addPost: (state , action)=>{
      const post = action.payload;
      state.posts.push(post);
      localStorage.setItem("posts",JSON.stringify(state.posts))
    },
    LikePost: (state, action) => {
      const {id , userId} = action.payload;
      const post = state.posts.find((p) => p.id == id);
      const reactionExist = state.userReactions.find((ur) => ur.postId == id && ur.UserId == userId)
      if(reactionExist){
        if(reactionExist.liked){
          post.reactions.likes--;
          state.userReactions = state.userReactions.filter((ur) => !(ur.postId == id && ur.UserId == userId))
        }
        else{
          post.reactions.likes++;
          post.reactions.dislikes--;
          reactionExist.liked = true;
        }
      }
      else{
        post.reactions.likes++;
        state.userReactions.push({postId : id , UserId : userId , liked : true});
      }
      localStorage.setItem("posts",JSON.stringify(state.posts));
      localStorage.setItem("userReactions" , JSON.stringify(state.userReactions))
    },
    DislikePost: (state, action) => {
      const {id , userId} = action.payload;
      const post = state.posts.find((p) => p.id == id);
      const reactionExist = state.userReactions.find((ur) => ur.postId == id && ur.UserId == userId)
      if(reactionExist){
        if(!reactionExist.liked){
          post.reactions.dislikes--;
          state.userReactions = state.userReactions.filter((ur) => !(ur.postId == id && ur.UserId == userId))
        }
        else{
          post.reactions.likes--;
          post.reactions.dislikes++;
          reactionExist.liked = false;
        }
      }
      else{
        post.reactions.dislikes++;
        state.userReactions.push({postId : id , UserId : userId , liked : false});
      }
      localStorage.setItem("posts",JSON.stringify(state.posts));
      localStorage.setItem("userReactions" , JSON.stringify(state.userReactions))
    },
  },
});
export const { StorePosts, LikePost, DislikePost , addPost } = postSlice.actions;
export default postSlice.reducer;
