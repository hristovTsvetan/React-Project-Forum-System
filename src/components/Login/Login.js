import "./Login.css";

export default function Login() {
    return (
      <form className="login-form">
        <label>
          <span>Email: </span>
          <input type="email" />
        </label>
        <label>
            <span>Password: </span>
            <input type="password" />
        </label>
        <button>Login</button>
      </form>
    );
}