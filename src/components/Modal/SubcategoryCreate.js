import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";
import uniqid from 'uniqid';

export default function SubcategoryCreate() {
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('');
    const [category, setCategory] = useState('');
    const {createSubcategoryAction} = useModal();
    const {documents} = useCollection('categories');
    const {getDocument, updateDocument} = useFirestore('categories');

    const submitHandler = async (e) => {
      e.preventDefault();
      const curDoc = await getDocument(category);

      if(curDoc) {
        const createdAt = timestamp.fromDate(new Date());
        const subCatId = uniqid();

        const newSubCategory = {
          [subCatId]: {
            subCategoryName: newSubcategoryName,
            subCategoryDescription: newSubcategoryDescription,
            parentId: category,
            category: curDoc.title,
            createdAt,
            id: subCatId,
            posts: {},
          },
        };

        updateDocument(category, {subCategories: {...curDoc.subCategories, ...newSubCategory}});

        createSubcategoryAction(false);
      }
    };

    const changeHandler = (e) => {
      setCategory(e.target.value);
    }

    return (
      <form className="category-edit" onSubmit={submitHandler}>
        <label>
          <div>
            <span>Subcategory name:</span>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setNewSubcategoryName(e.currentTarget.value)}
              value={newSubcategoryName}
              required
            />
          </div>
        </label>
        <label>
          <div>
            <span>Select category:</span>
          </div>
          <div>
           <select onChange={changeHandler} required>
             <option>Select</option>
            {documents?.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
           </select>
          </div>
        </label>
        <label>
          <div>
            <span>Description:</span>
          </div>
          <div>
            <textarea
              required
              cols="30"
              rows="10"
              onChange={(e) =>
                setNewSubcategoryDescription(e.currentTarget.value)
              }
              value={newSubcategoryDescription}
            ></textarea>
          </div>
        </label>
        <div className="modal-change-button-wrapper">
          <button className="modal-edit-chang-btn">Create</button>
          <button
            className="modal-edit-cancel-btn"
            onClick={() => createSubcategoryAction(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
}
