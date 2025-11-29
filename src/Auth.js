import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css"; // ✅ כאן אנחנו טוענים את הקובץ

export default function Auth({ setToken }) {
  const [Username, setUsername] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      let token;
      if (isLogin) {
        const response = await axios.post("/login", { Username, PasswordHash });
        token = response.data.token;
      } else {
        await axios.post("/register", { Username, PasswordHash });
        const loginResponse = await axios.post("/login", { Username, PasswordHash });
        token = loginResponse.data.token;
      }

      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");
    } catch (err) {
      setError(isLogin ? "Login failed" : "User already exists or login failed");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={PasswordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
          
        </form>

        {error && <p className="error">{error}</p>}

        <p
          className="toggle"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
       
        </p>
        <p>
                    כל הזכויות שמורות לנועה קשת ©️

        </p>
      </div>
      
    </div>
  );
}

