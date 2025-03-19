import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPost from '../components/AddPost.js';
import PostList from "../components/PostList.js";

function Home({comments, setComments, posts, setPosts}) {

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return(
        <div>
            <h1>Blog Home</h1>
            <AddPost addPost = {addPost} />
            <PostList comments={comments} setComments={setComments} posts = {posts} />
        </div>
    )
}

export default Home;