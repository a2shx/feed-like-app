import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const postPerPage = 10;
    
    useEffect(()=>{
        const fetchPost = async() => {
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
                const data = await response.json();
                setPosts(data);
            }catch(error){
                console.error('Error fetching data: ', error)
            }
        };
        fetchPost();
    },[currentPage]);

    return (
        <div>
            <h1>All Blog Post</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body.slice(0,50)}...</p>
                        <Link to={`/post/${post.id}`}>Read More</Link>
                    </li>
                ))}
            </ul>
            <div>
                <button
                onClick={() => setCurrentPage((prev) => Math.max(prev-1,1))}
                disabled={currentPage ===1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                onClick={() => setCurrentPage((prev) => prev+1)}
                disabled={posts.length<postPerPage}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Home;