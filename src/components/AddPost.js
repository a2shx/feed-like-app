import { useEffect, useState } from "react";
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
        <form onSubmit={handleSubmit}>
            <h3>Add New Post</h3>
            <textarea
                placeholder="What on your mind.."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Post!</button>
        </form>
    )
}

export default AddPost;