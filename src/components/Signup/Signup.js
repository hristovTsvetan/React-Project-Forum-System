import "./Signup.css";

import { useSignup } from "../../hooks/useSignup";
import { useHistory } from "react-router";

import { useState } from "react";

export default function Signup() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[displayName, setDisplayName] = useState('');
    const[repeatPassword, setRepeatPassword] = useState('');
    const[avatar, setAvatar] = useState('');
    const history = useHistory();
    const {signup, error, isPending} = useSignup();

    const handleSubmit = async (e) => {
      e.preventDefault();

      signup(email, password, displayName, repeatPassword);
      
    }


    return (
      <form onSubmit={handleSubmit} className="login-form">
        <span className="form-header-title">Register form</span>
        <label>
          <div className="label-form-wrapper">
            <span>Email: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
          </div>
        </label>
        <label>
          <div className="label-form-wrapper">
            <span>Password: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
          </div>
        </label>
        <label>
          <div className="label-form-wrapper">
            <span>Repeat password: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="password"
              required
              onChange={(e) => setRepeatPassword(e.currentTarget.value)}
              value={repeatPassword}
            />
          </div>
        </label>
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
        <label>
          <div className="label-form-wrapper">
            <span>Avatar: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="file"
              onChange={(e) => setAvatar(e.currentTarget.value)}
              value={avatar}
            />
          </div>
        </label>
        {isPending && <button className="register-button" disabled>Loading...</button>}
        {!isPending && <button className="register-button">Register</button>}
        {error && <p className="error">{error}</p>}
      </form>
    );

}