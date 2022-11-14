import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Authentication = () => {
  const [formType, setFormType] = useState("signup");

  const [
    signupUsernameRef,
    signupEmailRef,
    signupPasswordRef,
    signupConfirmPasswordRef,
  ] = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSumbitSignin = async (e) => {
    e.preventDefault();
    if (signupUsernameRef.current.value === "") {
      signupUsernameRef.current.focus();
    } else if (signupEmailRef.current.value === "") {
      signupEmailRef.current.focus();
    } else if (signupPasswordRef.current.value === "") {
      signupPasswordRef.current.focus();
    } else if (signupConfirmPasswordRef.current.value === "") {
      signupConfirmPasswordRef.current.focus();
    } else {
      try {
        const response = await fetch("http://localhost:8000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signupUsernameRef.current.value,
            email: signupEmailRef.current.value,
            password: signupPasswordRef.current.value,
            confirmPassword: signupConfirmPasswordRef.current.value,
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div id='auth-container' className='flex items-center justify-center'>
      {formType === "signup" ? (
        <div className='flex flex-col items-center bg-white rounded-md p-8 gap-9 border-2 border-neutral-200'>
          <h2 className='text-3xl font-semibold'>Signup</h2>
          <div>
            <form onSubmit={(e) => handleSumbitSignin(e)}>
              <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                  <label htmlFor='username' className='mr-2'>
                    Username:
                  </label>
                  <input
                    ref={signupUsernameRef}
                    autoComplete='off'
                    type='text'
                    name='username'
                    placeholder='username'
                    className='transition bg-neutral-100 border-b-2 outline-none focus:border-neutral-400 py-1 px-2'
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <label htmlFor='email' className='mr-2'>
                    Email:
                  </label>
                  <input
                    ref={signupEmailRef}
                    autoComplete='off'
                    type='email'
                    name='email'
                    placeholder='email'
                    className='transition bg-neutral-100 border-b-2 outline-none focus:border-neutral-400 py-1 px-2'
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <label htmlFor='password' className='mr-2'>
                    Password:
                  </label>
                  <input
                    ref={signupPasswordRef}
                    autoComplete='off'
                    type='password'
                    name='password'
                    placeholder='password'
                    className='transition bg-neutral-100 border-b-2 outline-none focus:border-neutral-400 py-1 px-2'
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <label htmlFor='confirmPassword' className='mr-2'>
                    Confirm Password:
                  </label>
                  <input
                    ref={signupConfirmPasswordRef}
                    autoComplete='off'
                    type='password'
                    name='confirmPassword'
                    placeholder='confirm password'
                    className='transition bg-neutral-100 border-b-2 outline-none focus:border-neutral-400 py-1 px-2'
                  />
                </div>
              </div>
              <div className='flex justify-center mt-6'>
                <button
                  className='rounded-lg py-2 px-5 text-white text-lg'
                  style={{ backgroundColor: "#EF4444" }}
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className='flex gap-1.5'>
            <p>Already Registered?</p>
            <a
              className='cursor-pointer'
              onClick={() => setFormType("login")}
              style={{ color: "#EF4444" }}
            >
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center bg-white rounded-md p-8 gap-9 border-2 border-neutral-200'>
          <h2 className='text-3xl font-semibold'>Login</h2>
          <div>
            <form>
              <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                  <label htmlFor='email' className='mr-2'>
                    Email:
                  </label>
                  <input
                    autoComplete='off'
                    type='text'
                    name='email'
                    placeholder='email'
                    className='transition bg-neutral-100 border-b-2 outline-none focus:border-neutral-400 py-1 px-2'
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <label htmlFor='password' className='mr-2'>
                    Password:
                  </label>
                  <input
                    autoComplete='off'
                    type='password'
                    name='password'
                    placeholder='password'
                    className='transition bg-neutral-100 border-b-2 outline-none focus:border-neutral-400 py-1 px-2'
                  />
                </div>
              </div>
              <div className='flex justify-center mt-6'>
                <button
                  className='rounded-lg py-2 px-5 text-white text-lg'
                  style={{ backgroundColor: "#EF4444" }}
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className='flex gap-1.5'>
            <p>Not Registered?</p>
            <a
              className='cursor-pointer'
              style={{ color: "#EF4444" }}
              onClick={() => setFormType("signup")}
            >
              Signup
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;
