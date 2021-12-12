import { useState, useEffect} from "react"
import { useParams, useHistory } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import uniqid from 'uniqid';
import { timestamp } from '../../firebase/config';
import { useUser } from "../../hooks/useUser";
import Path from "../Path/Path";

export default function CreateComment() {
    const [commentBody, setCommentBody] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [postName, setPostName] = useState('');
    const [isCanceled, setIsCanceled] = useState(false);
    const {getDocument, updateDocument} = useFirestore('categories');
    const {categoryid, subcategoryid, postId} = useParams();
    const {user} = useUser();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newCommentId = uniqid();
        const createdAt = timestamp.fromDate(new Date());

        const newComment = {
            [newCommentId]: {
                categoryId: categoryid,
                content: commentBody,
                createdAt: createdAt,
                dislikes: [],
                likes: [],
                id: newCommentId,
                owner: user.displayName,
                postId: postId,
                subCategoryId: subcategoryid,
                userAvatar: 'picture',
                uid: user.uid,
                isFirstComment: false,
            }
        }

        const curCategory = await getDocument(categoryid);
        const curPost = curCategory.subCategories[subcategoryid].posts[postId];
        const curPostComments = curCategory.subCategories[subcategoryid].posts[postId].comments;

        curPost.comments = {...curPostComments, ...newComment}

        updateDocument(categoryid, curCategory);

        history.push(`/comments/${categoryid}/${subcategoryid}/${postId}`);
    }

    useEffect(() => {

        const fetchData = async () => {
            const curCategory = await getDocument(categoryid);

            if(!isCanceled) {
                setCategoryName(curCategory.title);
                setSubCategoryName(curCategory.subCategories[subcategoryid].subCategoryName)
                setPostName(curCategory.subCategories[subcategoryid].posts[postId].postTitle);
            }
        }

        fetchData();

        return () => {
            setIsCanceled(true);
        };

    }, [categoryid, subcategoryid, postId, getDocument])

    return (
        <>
    	<Path categoryName={categoryName} subCategoryName={subCategoryName} postName={postName}/>
        <form className="login-form create-post" onSubmit={handleSubmit}>
          <span className="form-header-title">New Comment</span>
          <label>
            <div className="label-form-wrapper">
              <span>Comment content: </span>
            </div>
            <div className="input-comment-body">
              <textarea
                cols="70"
                rows="10"
                onChange={(e) => setCommentBody(e.currentTarget.value)}
                required
                value={commentBody}
              ></textarea>
            </div>
          </label>
          <button>Create</button>
        </form>
      </>
    )
}
