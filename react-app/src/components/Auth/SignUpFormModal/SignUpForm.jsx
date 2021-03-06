// PACKAGE IMPORTS
import { useState, useEffect } from "react";
import { Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

// REDUX IMPORTS FROM STORE
import {signup, login} from "../../../store/session";

// COMPONENT IMPORTS
import sign_up_img from "./sign_up_img.jpg";
import PasswordStrengthMeter from "../PasswordStrengthMeter";


const SignUpForm = ({setShowSignUpForm, setShowLoginForm, setIsOpen }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profileImage) {
        setProfileImage(`https://lessonblock.s3.amazonaws.com/Profile_Images/profile_pic.png`)
    }
  }, [profileImage, setProfileImage])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signup({username, email, password, isInstructor, profileImage}));
        if (!user.errors) {
          return <Redirect to="/dashboard" />
        } else {
          setErrors(user.errors);
        }
      };
  };

  const demoInstructorLogin = async (e) => {
    e.preventDefault();
    setTimeout(await dispatch(login("instructor@lessonblock.io", "8b4c7b0a-b365-4420-ae67-8f310c872054")), 1000);
    return <Redirect to="/dashboard" />
  };

  const demoStudentLogin = async (e) => {
    e.preventDefault();
    setTimeout(await dispatch(login("student@lessonblock.io", "719cfc7c-8a95-48ef-91ec-c6425790245f")), 1000);
    return <Redirect to="/dashboard" />
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateUserType = (e) => {
    setIsInstructor(e.target.value)
    console.log("isInstructor: ", isInstructor)
  }

  if (sessionUser) {
    return <Redirect to="/dashboard" />;
  }

  const label = "font-medium text-gray-900 mobile:text-sm";

  const whiteButtonStyle = "inline-block w-full mobile:p-1 mobile:mt-1 mobile:text-md font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease mobile:mb-1 widescreen:p-3 laptop:p-2"

  const blackButtonStyle = "inline-block w-full mobile:p-1 mobile:text-md font-medium text-center text-white transition duration-200 bg-black border bg-black-600 rounded-lg hover:bg-gray-700 hover:text-white ease  widescreen:p-3 mobile:mb-1 laptop:p-2"

  const formInputStyle = "block w-full laptop:w-full mobile:px-1 mobile:py-1 mobile:mt-1 mobile:text-md placeholder-gray-400 bg-gray-200 rounded-sm focus:outline-none laptop:p-2 widescreen:p-3focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50"

  const radioButtonStyle = "inline-block mobile:justify-between mobile:w-1/2 mobile:p-1 mobile:text-md font-medium text-center text-white transition duration-200 laptop:p-2 bg-black border bg-black-600 rounded-md hover:bg-gray-700 hover:text-white ease mobile:my-2 widescreen:p-3"

  return (
    <article className="container items-center justify-center hidden h-screen mobile:flex">

      <section className="flex-col justify-center hidden overflow-hidden mobile:flex mobile:w-5/12 widescreen:w-4/12 mobile:h-3/5 laptop:h-3/4 rounded-l-md">
        <div className="w-full h-full">
          <img src={sign_up_img} alt="people gazing at a wall of online lesson screens" className="relative object-cover w-full h-full m-auto"/>
        </div>
      </section>
      <section className="flex-col items-center hidden justify-evenly mobile:flex mobile:bg-white-space mobile:p-3 laptop:p-5 mobile:w-5/12 widescreen:w-4/12 mobile:h-3/5 laptop:h-3/4 bg-white-space rounded-r-md ">
        <div className="flex justify-between w-full">
            <h1 className="font-serif font-bold leading-tight text-black laptop:text-3xl mobile:text-lg">
            Sign Up and Start Learning!
            </h1>
            <button type="button" className="mobile:self-start" onClick={() => setIsOpen(false)}>
            <i className="text-sm fas fa-window-close" />
            </button>
          </div>
          <form onSubmit={onSignUp} className="w-full">
            <div className="relative w-full">
              <div className="relative">
                <ul>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
              <label className={label}>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={updateUsername}
                className={formInputStyle}
                placeholder="Username"
                required={true} />
            </div>
            <div className="relative">
              <label className={label}>Email</label>
              <input type="text"
                    name="email"
                  value={email}
                  onChange={updateEmail}
                  className={formInputStyle}
                  placeholder="Email Address"
                  required={true} />
            </div>
            <div className="relative">
              <label className={label}>Password</label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={updatePassword}
                className={formInputStyle}
                placeholder="Password" />
            </div>
            <div className="relative">
              <label className={label}>Confirm Password</label>
              <input
                  type="password"
                  value={repeatPassword}
                  required={true}
                  onChange={updateRepeatPassword}
                  className={formInputStyle}
                  placeholder="Password" />
            </div>
            {password && (
            <PasswordStrengthMeter password={password} />
            )}
            <div className="flex mobile:justify-around">
              <label className={radioButtonStyle}>
                <input
                    type="radio"
                    value={true}
                    name="instructor"
                    onChange={updateUserType}
                  />
                  Instructor
              </label>
              <label className={radioButtonStyle}>
                <input
                  type="radio"
                  value={false}
                  name="instructor"
                  onChange={updateUserType}
                />
                Student
                </label>
            </div>
            <div className="relative">
            <button
              type="submit"
              className={blackButtonStyle}
              >
              Create Account
            </button>
            <button
                type="submit"
                className={whiteButtonStyle}
                onClick={demoInstructorLogin}
            >
                Start Demo
                </button>
                <div className="flex laptop:mt-2">
                <p className="font-medium mobile:text-sm mobile:ml-1 laptop:text-md">Already have an account?</p>
                <button
                  type="button"
                  onClick={() => setShowSignUpForm(false) || setShowLoginForm(true)}
                  className="font-bold text-blue-700 laptop:text-md mobile:text-sm mobile:pl-1">
                    Login
                </button>
              </div>
            </div>
            </div>
      </form>
    </section>
  </article>
  );
};

export default SignUpForm;
