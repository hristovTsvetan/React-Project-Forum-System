import "./Signup.css";

export default function Signup() {
    return (
        <form className="login-form">
        <span className="form-header-title">Register form</span>
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
        <label>
          <div class="label-form-wrapper">
            <span>Repeat password: </span>
          </div>
          <div className="input-form-wrapper">
            <input type="password" />
          </div>
        </label>
        <label>
          <div class="label-form-wrapper">
            <span>Avatar: </span>
          </div>
          <div className="input-form-wrapper">
            <input type="file" />
          </div>
        </label>
        <button>Register</button>
      </form>
    );

}