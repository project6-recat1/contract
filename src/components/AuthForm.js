import React, { useState } from "react";
import axios from 'axios';
import '../styles/authform.css';
import Auth from '../images/Auth.jpg';

const AuthForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [success, setSuccess] = useState("");  // Add this line


  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
    setSuccess("");  // Clear success message when user starts typing

  };

  const register = async (event) => {
    event.preventDefault();
    const newErrors = {...errors};

    if (form.name === "") {
      newErrors.name = "Please enter your name";
    }
    if (form.email === "") {
      newErrors.email = "Please enter your email";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }
    if (form.password === "") {
      newErrors.password = "Please enter your password";
    } else if (form.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
    }
    if (form.phone === "") {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[\d]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number should be 10 digits and numeric";
    }

    if (Object.values(newErrors).every(x => x === "")) {
      try {
        const response = await axios.post("http://localhost/project6/register.php", form);
        if (response.data.error) {
          if (response.data.error.includes('Email')) {
            newErrors.email = response.data.error;
          } else if (response.data.error.includes('phone number')) {
            newErrors.phone = response.data.error;
          }
          setErrors(newErrors);
        }  else {
          localStorage.setItem("authToken", response.data.token);
          console.log(response.data);
          setSuccess("Registration successful!"); 
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          if (err.response.data.error.includes('Email')) {
            newErrors.email = err.response.data.error;
          } else if (err.response.data.error.includes('phone number')) {
            newErrors.phone = err.response.data.error;
          }
          setErrors(newErrors);
        }
      }
    } else {
      setErrors(newErrors);
    }
  };


  const login = async (event) => {
    event.preventDefault();
    const newErrors = {...errors};

    if (form.email === "") {
      newErrors.email = "Please enter your email";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }
    if (form.password === "") {
      newErrors.password = "Please enter your password";
    }

    if (Object.values(newErrors).every(x => x === "")) {
      try {
        const response = await axios.post("http://localhost/project6/login.php", form);
        if (response.data.message === 'Login successful') {
            localStorage.setItem("authToken", response.data.token);
            switch(response.data.role_id) {
                case 1:
                    window.location.href = '/page1';
                    break;
                case 2:
                    window.location.href = '/page2';
                    break;
                default:
                    window.location.href = '/defaultPage';
                    break;
            }
        } else {
            newErrors.email = "Login failed. Please check your email and password.";
            setErrors(newErrors);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = '/'; // Or redirect the user to login screen
  };

  return (
    <div className="container">
      <button onClick={logout}>Logout</button>
      <input type="checkbox" id="flip" />
      <div className="cover">
        <img src={Auth} alt="Auth cover" />
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
            <form onSubmit={login}>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input type="text" placeholder="Enter your email" name="email" onChange={handleChange} />
                </div>
                <div className="error-message">{errors.email}</div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} />
                </div>
                <div className="error-message">{errors.password}</div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <div className="title">Signup</div>
            <form onSubmit={register}>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Enter your name" name="name" onChange={handleChange} />
                </div>
                  <div className="error-message">{errors.name}</div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input type="text" placeholder="Enter your email" name="email" onChange={handleChange} />          
                </div>
                  <div className="error-message">{errors.email}</div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} />
                </div>
                <div className="error-message">{errors.password}</div>
                <div className="input-box">
                  <i className="fas fa-phone"></i>
                  <input type="tel" placeholder="Enter your phone number" name="phone" onChange={handleChange} />
                </div>
                <div className="error-message">{errors.phone}</div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="success-message">{success}</div> {/* Display success message */}
                <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
