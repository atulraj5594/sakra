import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AuthContext } from "../../Contexts/AuthContext";
import "./SignupStyle.css";
import axios from "axios";

const Signup = () => {
  const { userSignup } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(true);

  const signupDataHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword !== userDetails.password) {
      toast.error("Password and Comfirm Password Not Matching!!");
    } else {
      const formData = new FormData();
      formData.set('name', `${userDetails?.firstName} ${userDetails?.lastName}`);
      formData.set('email', userDetails?.email);
      formData.set('password', userDetails?.password);
      // formData.set('avatar', userDetails?.image);
      userSignup(formData)
    }
  };

  return (
    <div className="signup-page-container">
      <h1 className="signupHeading">Signup Page</h1>
      <div className="signup-form-container">
        <form onSubmit={(e) => signupDataHandler(e)}>
          <div className="signup-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="test"
              required
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>
          <div className="signup-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="user"
              required
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
          <div className="signup-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="test@gmail.com"
              required
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <input
              type={isPasswordHide ? "password" : "text"}
              placeholder={isPasswordHide ? "********" : "Enter Password"}
              id="password"
              required
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <span onClick={() => setIsPasswordHide(!isPasswordHide)}>
              {isPasswordHide ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="signup-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={isConfirmPasswordHide ? "password" : "text"}
              placeholder={
                isConfirmPasswordHide ? "********" : "Enter Password"
              }
              id="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setIsConfirmPasswordHide(!isConfirmPasswordHide)}
            >
              {isConfirmPasswordHide ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
          {/* Avatar: <input type="file" onChange={(e) =>
            setUserDetails((prev) => ({
              ...prev,
              image: e.target.files[0],
            }))
          } /> */}
          <button className="signup-btn" type="submit">
            Signup
          </button>
        </form>
        <p className="signup-login-btn" onClick={() => navigate("/login")}>
          Already Have an Account ?
        </p>
      </div>
    </div>
  );
};
export { Signup };
