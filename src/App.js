import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import React from "react";
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import Post from './pages/Post';

function App() {
    return (
        <BrowserRouter>
        <nav>
            <Link to="/">Home</Link>
        </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<NotFound/>}/>
                <Route path="/post/:id" element={<Post/>} />
                <Route path="/user/:id" element={<UserProfile/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
