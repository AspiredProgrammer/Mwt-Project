import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles.css";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err) => err.msg));
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="index-container">
      <Navbar />
      <div
        className="login-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          className="login-form"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Login</h1>
          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}
          {errors.length > 0 && (
            <ul
              style={{
                color: "red",
                marginBottom: "1rem",
              }}
            >
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}
          <form onSubmit={handleLogin}>
            <div
              className="form-group"
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Email:
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div
              className="form-group"
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Password:
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#39b575",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer pos={"absolute"} />
    </div>
  );
};
export default Login;
