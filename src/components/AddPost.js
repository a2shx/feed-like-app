import { useState } from "react";
import formattedDate from "./FormattedDate";
import '../App.css'

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
                <textarea className="text-area"
                    rows="5"
                    placeholder="What on your mind.."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button className="submit-post" type="submit">Post</button>
            </form>
        </div>
    )
}

export default AddPost;