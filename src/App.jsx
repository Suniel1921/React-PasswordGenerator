import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

const App = () => {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const generatePassword = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numberAllowed) str += '0123456789';
    if(charAllowed) str += '!@#$%^&*()';


    for(let i=1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
   passwordRef.current?.select();
   passwordRef.current?.setSelectionRange(0,100)
  
    window.navigator.clipboard.writeText(password)
    toast.success('Copied !')

  },[password])

  useEffect(()=>{
    generatePassword();
  },[length, numberAllowed, charAllowed, generatePassword])

  return (
    <>
     <div className='flex justify-center items-center h-screen'>
  <div className='container w-full max-w-md mx-auto shadow-md rounded-lg text-black bg-gray-700'>
    <h3 className='text-center text-white mt-9 text-2xl'>Password Generator</h3>

    <div className='flex shadow rounded-lg overflow-hidden mb-5 w-80 ml-12'>
      <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
      />

      <button onClick={copyPassword} className='bg-green-300 px-3 shrink-0'>
        Copy
      </button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
          onChange={(e) => setLenght(e.target.value)}
          type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
        />
        <label htmlFor="lengthInput">Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          type="checkbox"
          defaultChecked={numberAllowed}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          type="checkbox"
          defaultChecked={charAllowed}
        />
        <label htmlFor="charInput">Characters</label>
      </div>
    </div>
  </div>
</div>
<Toaster />


     <Toaster />
    </>
  )
}

export default App