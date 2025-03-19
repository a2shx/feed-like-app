import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useState } from "react";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PostPage from './pages/PostPage';
function App() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    return (
        <BrowserRouter>
        <nav>
            <Link to="/">Home</Link>
        </nav>
            <Routes>
                <Route path="/" element={<Home comments={comments} setComments={setComments} posts={posts} setPosts={setPosts}/>} />
                <Route path="*" element={<NotFound/>}/>
                <Route path="/post/:id" element ={<PostPage comments={comments} setComments={setComments} posts={posts} setPosts={setPosts}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
