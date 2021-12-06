import "./Login.css";

export default function Login() {
    return (
      <form className="login-form">
        <span className="form-header-title">Login form</span>
        <label>
          <div class="label-form-wrapper">
            <span>Email: </span>
          </div>
          <div className="input-form-wrapper">
            <input type="email" />
          </div>
        </label>
        <label>
          <div class="label-form-wrapper">
            <span>Password: </span>
          </div>
          <div className="input-form-wrapper">
            <input type="password" />
          </div>
        </label>
        <button>Login</button>
      </form>
    );
}