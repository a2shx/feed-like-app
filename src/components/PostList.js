import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Component that updates every minute
function ConvertTime({ time, currentTime }) {
    const now = new Date(currentTime);
    const past = new Date(time);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return past.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); // Show full date if older
}

function PostList({ posts }) {
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
                        <Link to={`/post/${post.id}`}>
                            <p><ConvertTime time={post.id} currentTime={currentTime} /></p>
                        </Link>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
