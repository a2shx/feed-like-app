import { useState } from "react";
import formattedDate from "./FormattedDate";
import '../App.css'

function EditPost({post,setPosts,setIsEdit}) {
    const [content, setContent] = useState(post.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPosts((prevPosts) => 
        prevPosts.map((p) => p.id === post.id ? {...p, content, lastEdit:formattedDate(Date.now())}: p))
        setIsEdit(false);
    }

    return(
        <div >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg justify-items-center w-7/12 z-10">
                <form className="items-center flex flex-col w-full" onSubmit={handleSubmit}>
                    <textarea
                        className="text-area"
                        rows='5'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="text-center">
                    <button className="confirm-button  mb-1" type="submit">Save</button>
                    <button className="confirm-button  ml-1" onClick={() => setIsEdit(false)}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className="bg-screen" onClick={() => setIsEdit(false)}>
            </div>
        </div>
    )
}

export default EditPost;