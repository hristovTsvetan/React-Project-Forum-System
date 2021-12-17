import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, isPending, login} = useLogin();

    const handleSubmit = (e) => {
      e.preventDefault();
      
      login(email, password);
   }

    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="form-header-title">Login form</span>
        <label>
          <div className="label-form-wrapper">
            <span>Email: </span>
          </div>
          <div className="input-form-wrapper">
            <input
              type="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
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
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              value={password}
            />
          </div>
        </label>
        {!isPending && <button>Login</button>}
        {isPending && <button disabled>Loading...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    );
}