import React from 'react'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 '>
        <input type="text" placeholder='username' className="border p-3 rounded-lg hover:border-gray-300" id='username' />
        <input type="text" placeholder='email' className="border p-3 rounded-lg hover:border-gray-300" id='email' />
        <input type="text" placeholder='password' className="border p-3 rounded-lg hover:border-gray-300" id='password' />
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:bg-slate-600 disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 my-5'>
        <p>Have an account?</p>
        <span className='text-blue-700 hover:opacity-80'>Sign in</span>
      </div>
    </div>
  )
}

export default SignUp