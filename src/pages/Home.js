import AddPost from '../components/AddPost.js';
import PostList from "../components/PostList.js";

function Home({comments, setComments, posts, setPosts}) {

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return(
        <div className="justify-items-center p-5 border h-screen container max-w-screen-lg justify-self-center">
            <h1 className="text-4xl font-bold mb-5">Blog Home</h1>
            <AddPost addPost = {addPost} />
            <PostList comments={comments} setComments={setComments} posts = {posts} />
        </div>
    )
}

export default Home;