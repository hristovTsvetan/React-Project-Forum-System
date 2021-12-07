import { useModal } from "../../hooks/useModal";
import { useState } from "react";

export default function PostEdit() {

    const [newPostName, setNewPostName] = useState('');
    const {editPostAction} = useModal();

    const submitHandler = () => {

    };

    return (
        <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>Current post title:</span>
          </div>
          <div>
            <p>Hello there</p>
          </div>
        </label>
        <label>
          <div>
            <span>New post title:</span>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewPostName(e.currentTarget.value)}
              value={newPostName}
              required
            />
          </div>
        </label>
        <div className="modal-change-button-wrapper">
          <button className="modal-edit-chang-btn">Change</button>
          <button className="modal-edit-cancel-btn" onClick={() => editPostAction(false)}>Cancel</button>
        </div>
      </form>
    )
}
