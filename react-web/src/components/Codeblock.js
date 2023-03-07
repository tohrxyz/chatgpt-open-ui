import React, { useEffect } from 'react';
import Prism from "../prism/prism.js";
import '../prism/prism.css';

export default function Codeblock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleClick = () => {
    navigator.clipboard.writeText(props.children);
  }

  return (
    <pre>
        <div 
          className='text-sm py-1 px-4 -m-4 mb-4 bg-gray-700 text-gray-300 rounded-sm flex flex-row justify-between'
        >
          <div>{props.language}</div>
          <button onClick={handleClick}>
            Copy
          </button>
        </div>
        <code className={`language-${props.language}`}>
            {props.children}
        </code>
    </pre>
  );
}