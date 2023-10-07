import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null);

  const createPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);

  }, [length, charAllowed, numbersAllowed])

  useEffect(()=> {
    createPassword();
  }, [length, charAllowed, numbersAllowed]);

  const copyPasswordToClipboard = ()=> {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className='max-w-lg mx-auto shadow-md rounded-lg bg-gray-800 py-3 mt-8 px-4 text-orange-500'>
      <h1 className='text-white text-xl text-center font-semibold my-3'>Password Generator</h1>
          <div className='flex rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              className='outline-none shadow w-full py-1 px-3 text-lg font-semibold'
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              className='bg-blue-700 text-lg text-white py-0.5 px-3 outline-none'
              onClick={copyPasswordToClipboard}
            >Copy</button>
          </div>
          <div className='flex gap-x-6 text-lg'>
            <div className='flex items-center gap-x-1'>
              <input
                className=''
                id='setRange'
                type="range"
                min={6}
                max={25}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="setRange">Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input
                type="checkbox"
                id="numberCheck"
                onChange={(e) => setNumbersAllowed((prev) => !prev)}
              />
              <label htmlFor="numberCheck" className=''>Numbers</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input
                type="checkbox"
                id="charactersCheck"
                onChange={(e) => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="charactersCheck" className=''>Characters</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
