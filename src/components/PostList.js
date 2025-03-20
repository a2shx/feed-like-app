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
        <div className="container max-w-screen-sm">
            <ul className="">
                {[...posts].reverse().map((post) => (
                    <li className="post-container" key={post.id}>
                        <div className="border-b pb-3">
                        <div className="flex items-center">
                            <img className="w-10 rounded-full mr-3" src="/Display.png"/>
                            <div>
                            <h4 className="font-bold">{post.username}</h4>
                            <div  className="relative group inline-block">
                                <p className="time-tooltips">
                                    {post.lastEdit === null ? post.time : `Last edit: ${post.lastEdit}`}
                                </p>
                                <div className="cursor-pointer">
                                <Link to={`/post/${post.id}`}>
                                    <p className="time-display hover:opacity-70"><ConvertTime time={post.id}/></p>  
                                </Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="pt-5">
                        <p className="mb-5 px-2">{post.content}</p>
                        <AddComment comments={comments} setComments={setComments} pId={post.id}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
