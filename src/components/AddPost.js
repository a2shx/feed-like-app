import { useEffect, useState } from "react";

function AddPost({addPost}) {
    const [content, setContent] = useState('');

    const formattedDate = (now) => {
        const unixTimestamp = now;
        const date = new Date(now);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true,
          });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const now = Date.now();
        const newPost = {
            id: now,
            username:'me',
            time:formattedDate(now),
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