import { useState } from "react";
import formattedDate from "./FormattedDate";

function AddPost({addPost}) {
    const [content, setContent] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const now = Date.now();
        const newPost = {
            id: now,
            username:'me',
            time:formattedDate(Date.now()),
            lastEdit:null,
            content:content,
        }
        addPost(newPost);
        setContent('');
    };


    return(
        <div className="container max-w-screen-sm">
            <form className="items-center flex flex-col" onSubmit={handleSubmit}>
                <h3 className="mb-3 ">Add New Post</h3>
                <textarea className="border rounded-md mb-2 w-full p-3 bg-gray-100"
                    placeholder="What on your mind.."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button className="bg-black text-white font-bold w-full rounded-md p-1 mb-5 hover:opacity-70" type="submit">Post</button>
            </form>
        </div>
    )
}

export default AddPost;