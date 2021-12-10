import Post from "./Post";

export default function PostsList({allPosts}) {

    return (
        <>
            {allPosts.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()).map(post => <Post key={post.id} postInfo={post}/>)}
        </>
    )
}
