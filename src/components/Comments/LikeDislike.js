import './LikeDislike.css'
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';

export default function LikeDislike({comment}) {
    const {user} = useUser();
    const {catId, subId, postId} = useParams();
    const {updateDocument, getDocument} = useFirestore('categories');

    const updateLikesDislikes = async () => {
        const curCategory = await getDocument(catId);
        const curSubCategory = curCategory.subCategories[subId];
        const curPost = curSubCategory.posts[postId];
        
        const newComment = {[comment.id]: comment};
        curPost.comments = {...curPost.comments, ...newComment};

        await updateDocument(catId, curCategory);
    }

    const clickLikeHandler = async () => {
        const uid = user.uid;

        if(!comment.likes.includes(uid)) {
            comment.likes.push(uid);

            comment.dislikes.includes(uid) && comment.dislikes.splice(comment.dislikes.indexOf(uid), 1);
        }
        
        updateLikesDislikes();
    }

    const clickDislikesHandler = async () => {
        const uid = user.uid;

        if(!comment.dislikes.includes(uid)) {
            comment.dislikes.push(uid);

            comment.likes.includes(uid) && comment.likes.splice(comment.likes.indexOf(uid), 1);
        }
        
        updateLikesDislikes();
    }

    return (
      <>
        <div className="comment-like">
          <Link to="#" onClick={clickLikeHandler}>
            <i className="far fa-thumbs-up"></i>
          </Link>
          <p className="comment-like-dislike-counter">{comment.likes.length}</p>
        </div>
        <div className="comment-like comment-dislike">
          <Link to="#" onClick={clickDislikesHandler}>
            <i className="far fa-thumbs-down"></i>
          </Link>
          <p className="comment-like-dislike-counter">
            {comment.dislikes.length}
          </p>
        </div>
      </>
    );
}
