import React, { useEffect, useState } from 'react';
import Prism from "../prism/prism.js";
import '../prism/prism.css';

export default function Codeblock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
  
    navigator.clipboard.writeText(props.children);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <pre>
        <div className='flex justify-between text-sm py-1 px-4 -m-4 mb-4 bg-gray-700 text-gray-300 rounded-sm'>
          {/* {console.log(props.language)} */}
          <div>{props.language}</div>
          <button onClick={handleClick}>{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <code className={`language-${props.language}`}>
            {props.children}
        </code>
    </pre>
  );
}