import { useCallback, useEffect, useRef, useState } from "react";
import { numbers, Letters, specialCharacters } from "./Characters";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [letters, setLetters] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = Letters;
    if (number) str += numbers;
    if (includeSymbols) str += specialCharacters;
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, number, letters, includeSymbols, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, letters, includeSymbols]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none hover:bg-blue-700 bg-sky-500 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        {/* Range */}
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          {/* Checkbox Number */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={includeSymbols}
              id="characterInput"
              onChange={() => {
                setIncludeSymbols((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
