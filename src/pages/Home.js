import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    
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
    },[]);

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
        </div>
    )
}

export default Home;