import './SubcategoryEdit.css';

import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { useFirestore } from '../../hooks/useFirestore';
import { useEffect } from 'react/cjs/react.development';

export default function SubcategoryEdit() {
    const [newSubcategoryName, setNewSubcategoryName] = useState(null);
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const {editSubCategoryAction, itemId} = useModal();
    const {getDocument, updateDocument} = useFirestore('categories');

    useEffect(async () => {
      const curCategory = await getDocument(itemId.parentId);
      const curSubCategory = curCategory.subCategories[itemId.id];
      setCurrentTitle(curSubCategory.subCategoryName);
      setCurrentDescription(curSubCategory.subCategoryDescription);
    }, []);


    const submitHandler = async (e) => {
      e.preventDefault();
      const curCategory = await getDocument(itemId.parentId);
      const curSubCategory = curCategory.subCategories[itemId.id];

      curSubCategory.subCategoryName = newSubcategoryName;
      curSubCategory.subCategoryDescription = newSubcategoryDescription;

      await updateDocument(itemId.parentId, curCategory);

      editSubCategoryAction(false, null)
    }

    

    return (
      <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>New subcategory name:</span>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewSubcategoryName(e.currentTarget.value)}
              value={newSubcategoryName === null ? currentTitle : newSubcategoryName}
              required
            />
          </div>
        </label>
        <label>
          <div>
            <span>New description:</span>
          </div>
          <div>
            <textarea
              required
              cols="30"
              rows="10"
              onChange={(e) =>
                setNewSubcategoryDescription(e.currentTarget.value)
              }
              value={ newSubcategoryDescription === null ? currentDescription : newSubcategoryDescription}
            ></textarea>
          </div>
        </label>
        <div className="modal-change-button-wrapper">
          <button className="modal-edit-chang-btn">Change</button>
          <button
            className="modal-edit-cancel-btn"
            onClick={() => editSubCategoryAction(false, null)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
}
