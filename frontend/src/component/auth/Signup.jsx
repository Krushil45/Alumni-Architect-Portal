import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Constant from "../../utils/Constant";
import "../../style/auth/SignUp.css";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    type: "STUDENT",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!signupInfo.fullName || !signupInfo.email || !signupInfo.password) {
      showError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const URL = `${Constant.BASE_URL}/auth/signup`;
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await res.json();
      console.log(result);

      if (result.status) {
        localStorage.setItem("email", signupInfo.email);
        localStorage.setItem("fullName", signupInfo.fullName);
        navigate("/verify-otp", { state: { type : signupInfo.type } });
      } else {
        showError("Error occurred: " + result.message);
      }
    } catch (e) {
      console.error(e);
      showError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container--main">
      {error && <div className="error-message">{error}</div>}
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={signupInfo.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupInfo.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="type"
              value={signupInfo.type}
              onChange={handleChange}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="ALUMNI">Alumni</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="form-links">
          <Link to="/signin">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
