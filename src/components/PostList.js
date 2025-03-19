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
                    <li className="border rounded-md p-5 w-full mb-5 shadow-lg" key={post.id}>
                        <div className="border-b pb-3">
                        <div className="flex items-center">
                            <img className="w-10 rounded-full mr-3" src="../Displaypic/Display.png"/>
                            <div>
                            <h4 className="font-bold">{post.username}</h4>
                            <div  className="relative group inline-block">
                                <p className="absolute left-1/2 -translate-x-1/2 top-6 bg-gray-800 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none max-w-xs break-words text-center">
                                    {post.lastEdit === null ? post.time : `Last edit: ${post.lastEdit}`}
                                </p>
                                <div className="cursor-pointer">
                                <Link to={`/post/${post.id}`}>
                                    <p className="text-sm text-gray-500 hover:opacity-70"><ConvertTime time={post.id}/></p>  
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
