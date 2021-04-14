import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import { Redirect, Link} from 'react-router-dom';
import {login} from '../../../store/session';
import login_img from './login_img.jpg'


const whiteButtonStyle = 'inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease'
const blackButtonStyle = 'inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-black border bg-black-600 rounded-lg hover:bg-gray-700 hover:text-white ease'
const formInputStyle = 'block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-sm focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50'


const LoginForm = ({ authenticated, setAuthenticated, setShowLoginForm, setShowSignUpForm, setIsOpen }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login(email, password));
    if (!user.errors) {
      setAuthenticated(true);
      return <Redirect to='/dashboard' />
    } else {
      setErrors(user.errors);
    }
  };

  const demoInstructorLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('instructor@lessonblock.io', '8b4c7b0a-b365-4420-ae67-8f310c872054'));
    setAuthenticated(true)
    return <Redirect to='/dashboard' />
  };

  const demoStudentLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('student@lessonblock.io', '719cfc7c-8a95-48ef-91ec-c6425790245f'));
    setAuthenticated(true)
    return <Redirect to='/dashboard' />
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container flex justify-end h-screen mt-96'>
      <div className='absolute object-right-top pt-5 pr-8'>
        <button type='button' onClick={() => setIsOpen(false)}>
          <i className='fas fa-window-close' />
        </button>
      </div>
      <div className='flex flex-col items-center justify-center w-6/12 overflow-hidden h-2/3 bg-brand-tan rounded-l-md'>
          <img src={login_img} alt='people gazing at a wall of online lesson screens'className='h-screen'/>
      </div>
    <div className='flex flex-col items-center justify-center w-6/12 h-2/3 bg-white-space rounded-r-md'>
    <h1 className='pb-12 mt-12 font-serif text-6xl font-bold leading-tight text-black sm:text-7xl'>
                    Welcome Back!
                </h1>
      <form onSubmit={onLogin} className='w-6/12 pb-10'>
        <div className='relative w-full space-y-4'>
            <div className='relative'>
                {!errors ? (
                  <label htmlFor='email' className='font-medium text-gray-900'>email</label>
                  ) : errors.map((error) => (
                      error.includes("email") ?
                        <label htmlFor='email' className="font-medium text-red-500">{error}</label>
                        : null
                  ))
                  }
                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                    className={formInputStyle}
                />
            </div>
            <div className='relative'>
            {!errors ? (
                  <label htmlFor='password' className='font-medium text-gray-900'>Password</label>
                  ) : errors.map((error) => (
                      error.includes("Password") ?
                        <label htmlFor='password' className="font-medium text-red-500">{error}</label>
                        : null
                  ))
                  }

                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                    className={formInputStyle} />
            </div>
            <div className='relative'>
                <button
                  type='submit'
                  className={blackButtonStyle}
                >
                  Log In
                </button>
                  <button
                  type='submit'
                  className={whiteButtonStyle}
                  onClick={demoInstructorLogin}
                  >
                  Demo Instructor
                  </button>
                  <button
                  type='submit'
                  className={whiteButtonStyle}
                  onClick={demoStudentLogin}
                  >
                  Demo Student
                  </button>
            </div>
            <div className='flex justify-between'>
              <button
              type='button'
              onClick={() => setShowSignUpForm(true) || setShowLoginForm(false)}>Don't have an account?</button>
            <Link to='/sign-up'>Forgot Password?</Link>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};


export default LoginForm;