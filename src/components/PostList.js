import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddComment from "./Comment";
import ConvertTime from "./TimeAgo";

function PostList({ posts, comments, setComments }) {
    const [currentTime, setCurrentTime] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <ul>
                {[...posts].reverse().map((post) => (
                    <li key={post.id}>
                        <h4>{post.username}</h4>
                        {post.lastEdit === null ? <p>{post.time}</p> : <p>Last edit: {post.lastEdit}</p>}
                        <Link to={`/post/${post.id}`}>
                            <p><ConvertTime time={post.id}/></p>  
                        </Link>
                        <p>{post.content}</p>
                        <AddComment comments={comments} setComments={setComments} pId={post.id}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
