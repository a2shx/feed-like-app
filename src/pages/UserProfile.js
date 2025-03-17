import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const handleError = (error,source) => {
        console.error(`Error in ${source}: `, error);
    }

    useEffect(() => {
        const fetchUser = async() => {
            try{
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!userResponse) throw new Error('failed to fetch user')
                const userData = await userResponse.json();
                setUser(userData);
            }catch(error){
                handleError(error, 'fetchUser')
            }
        }
        const fetchPosts = async() => {
            try{
                const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
                if (!postsResponse) throw new Error('failed to fetch posts')
                const postsData = await postsResponse.json();
                setPosts(postsData);
            }catch(error){
                handleError(error, 'fetchPosts')
            }
        }
        fetchUser();
        fetchPosts();
    },[id])

    if (!user) return <p>Loading...</p>;

    console.log(user)

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.address.city}</p>
            <p>{user.email}</p>
            <h2>Post by {user.name}</h2>
            <ul>
                {posts.map((posts) => (
                    <li key={posts.id}>
                        <h3>{posts.title}</h3>
                        <p>{posts.body.slice(0,50)}...</p>
                        <Link to={`/post/${posts.id}`}>Read More</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserProfile;