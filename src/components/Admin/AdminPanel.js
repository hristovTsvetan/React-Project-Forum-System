import { NavLink } from "react-router-dom";

import './AdminPanel.css';

export default function AdminPanel() {
  return (
    <section className="admin-header">
      <span className="admin-header-title">Admin Panel</span>
      <ul>
        <li>
          <NavLink to="/create/category">Create caregory</NavLink>
        </li>
        <li>
          <NavLink to="/create/subcategory">Create subcaregory</NavLink>
        </li>
        <li>
          <NavLink to="/users">Administrate users</NavLink>
        </li>
      </ul>
    </section>
  );
}
