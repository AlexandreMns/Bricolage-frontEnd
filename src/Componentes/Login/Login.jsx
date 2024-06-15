import React, { useState } from "react";
import { loginUser } from "../../Services/userService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.css'; // Import your custom CSS

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Token de autenticação salvo com sucesso:", response.data.user.role);
        localStorage.setItem("userRole", response.data.user.role);
      }

      setTimeout(() => {
        navigate("/home");
      }, 2000);

      console.log("Usuário logado com sucesso:", response.data.user.role);
    } catch (error) {
      console.error("Erro ao logado usuário:", error);
    }
  };

  return (
    <div >
      <div >
        <div >
          <div >
            <div>
              <form onSubmit={handleSubmit}>
                <div >
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-link btn-block mt-2"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
                <p>Still not registed?</p><Link to={`/register`}> Register</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
