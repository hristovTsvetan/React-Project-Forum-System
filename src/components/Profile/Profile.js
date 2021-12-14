import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development"
import { authObj, firebaseStorage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { useUser } from "../../hooks/useUser";

import './Profile.css';

export default function Profile() {
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [newThumbnail, setNewThumbNail] = useState(null);
    const [avatarError, setAvatarError] = useState(null);
    const {user, updateAction} = useUser();
    const [isPending, setIsPending] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);
    const history = useHistory();
    const {getDocument, updateDocument} = useFirestore('users');

    useEffect(() => {
        setDisplayName(user.displayName);
        setThumbnail(user.photoURL);

    }, [user.displayName, user.photoURL])
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        isCanceled && history.push('/');
        setIsPending(true);

        //firestore user
        const curUser = authObj.currentUser;

        //user in user collection
        const userForUpdate = await getDocument(user.uid);

        if(newThumbnail === null) {
            await curUser.updateProfile({displayName}); 
            
            userForUpdate.displayName = displayName;
        }
        else {
            const uploadPath = `thumbnails/${curUser.uid}/${newThumbnail.name}`;
            const img = await firebaseStorage.ref(uploadPath).put(newThumbnail);
            const imgUrl = await img.ref.getDownloadURL();

            userForUpdate.photoURL = imgUrl;
            userForUpdate.displayName = displayName;
    
            await curUser.updateProfile({displayName, photoURL: imgUrl});   
        }

        //save user changes in auth service
        updateAction({...curUser, role: user.role});
        //save user changes in collection
        await updateDocument(user.uid, userForUpdate)

        setIsPending(false);

        history.push('/')
    }

    const handleFileChange = (e) => {

        const curFile = e.target.files[0]

        if(!curFile) {
            setThumbnail(user.photoURL);
            return;
        }
    
        if(!curFile.type.includes('image')) {
            setAvatarError('Selected file must be image!');
            return;
        }
    
        if(curFile.size > 300000) {
            setAvatarError('Size on image must be max 300kb!');
            return;
        }
    
        setAvatarError(null);

        const picUrl = URL.createObjectURL(curFile);
        setThumbnail(picUrl);
        setNewThumbNail(curFile);
    }

    return (
      <form onSubmit={handleSubmit} className="login-form">
        <span className="form-header-title">User profile</span>
        <label>
          <div className="label-form-wrapper">
            <span>Display name: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="text"
              required
              onChange={(e) => setDisplayName(e.currentTarget.value)}
              value={displayName}
            />
          </div>
        </label>
        <div className="profile-img-wrapper">
            <img src={thumbnail} alt="Avatar" />
        </div>
        <label>
          <div className="label-form-wrapper">
            <span>Avatar: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="file"
                onChange={handleFileChange}
            />
          </div>
        </label>
        <div className="profile-buttons">
          {!isPending && <button className="upd-button">Update profile</button>}
          {isPending && <button className="loadingBtn" disabled>Updating...</button>}
          <button onClick={() => setIsCanceled(true)}>Cancel</button>
        </div>
        {avatarError && <p className="error">{avatarError}</p>}
      </form>
    );
}
