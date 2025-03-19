import { useState } from "react";
import formattedDate from "./FormattedDate";

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
                        className="border rounded-md mb-2 w-full p-3 bg-gray-100"
                        rows='4'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div>
                    <button className="bg-black text-white py-1 px-5 rounded-md hover:opacity-70" type="submit">Save Changes</button>
                    <button className="bg-black text-white py-1 px-5 rounded-md ml-2 hover:opacity-70" onClick={() => setIsEdit(false)}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40" onClick={() => setIsEdit(false)}>
            </div>
        </div>
    )
}

export default EditPost;