import { useState } from "react";

function EditPost({post,setPosts,setIsEdit}) {
    const [content, setContent] = useState(post.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPosts((prevPosts) => 
        prevPosts.map((p) => p.id === post.id ? {...p, content}: p))
        setIsEdit(false);
    }

    return(
        <form onSubmit={handleSubmit}>
            <h3>Edit</h3>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Save Changes</button>
        </form>
    )
}

export default EditPost;