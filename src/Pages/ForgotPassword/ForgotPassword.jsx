import React, { useState } from "react";
import { forgotUserPassword } from "../../Services/userService";
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'; // Import your custom CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotUserPassword({ email });
      console.log("Email de recuperação enviado com sucesso:", response.data);
      alert("Email de recuperação enviado com sucesso.");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error);
      alert("Erro ao enviar email de recuperação.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Forgot Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

