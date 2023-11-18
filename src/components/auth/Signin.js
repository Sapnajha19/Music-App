import React, { useState } from 'react'
import musicalNote from "../../assets/musical-note.png"
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Google from "../../assets/google.png";
import { GoogleAuthProvider } from 'firebase/auth';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [warning, setWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")

  const signin = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        console.log(credentials)
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        setWarning(true);
        setWarningMessage("Incorrect username or password.");
      })
  }

  const handleGoogleLogin = (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
        navigate("/")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)
        // ...
      });
  }

  return (
    <div>
      <div className='flex flex-row items-center mt-5 ml-5 gap-1'>
        <img src={musicalNote} alt="" className='w-[40px] h-[40px]' />
        <p className='text-3xl font-bold'>Musica</p>
      </div>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-yellow-500 w-[500px] h-[600px] rounded-md'>
          <div className='flex flex-row gap-5 justify-center'>
            <img src={musicalNote} alt="" className='w-[40px] h-[40px] mt-4' />
            <p className='text-2xl font-semibold mt-4'>Musica</p>
          </div>
          <p className='font-bold text-xl text-center mt-4'>Sign in to Musica</p>
          <form className='flex flex-col ml-5 mt-10 gap-5' onSubmit={signin}>
            {warning && <div className='bg-[red] w-[460px] h-[50px] text-[#fff] font-semibold flex flex-row gap-2 items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
              <p className='text-sm'>{warningMessage}</p></div>}
            <label className='font-medium'>
              Enter your email:
            </label>
            <input type="email" name="name" style={{ textIndent: "16px" }} placeholder='Enter your email.' className='relative h-[40px] rounded-md outline-none w-[460px]' onChange={(event) => {
              setEmail(event.target.value)
              setWarning(false)
            }} />
            {/* {warning && <p className='text-md text-[red] font-medium'>{warningMessage}</p>} */}
            <label className='font-medium'>
              Enter your password:
            </label>
            <input type="password" name="name" style={{ textIndent: "16px" }} placeholder='Enter your password.' className='h-[40px] rounded-md outline-none w-[460px]' onChange={(event) => {
              setPassword(event.target.value)
              setWarning(false)
            }} />
            <button type="submit" className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded w-[100px]'>Sign in</button>
          </form>
          <div className='flex flex-col'>
            <p className='mx-auto'>Or</p>
            <div className='w-[460px] h-[1px] bg-yellow-100 mx-auto mt-2'></div>
            <button onClick={handleGoogleLogin} className='flex flex-row items-center justify-center gap-5 w-[250px] h-[50px] rounded-full border border-white bg-transparent mt-5 mx-auto'>
              <img src={Google} alt="google-logo" className='w-6 h-6' />
              <p>Sign in with Google</p>
            </button>
            <div className='flex flex-row gap-1 mx-auto mt-2'>
              <p className='font-medium text-yellow-100'>Don't have an account?</p>
              <Link to={"/signup"} className='font-semibold text-[#fff] underline'>Create free account here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
