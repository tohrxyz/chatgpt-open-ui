import React, { useEffect } from 'react';
import Prism from "../prism/prism.js";
import '../prism/prism.css';

export default function Codeblock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
        <div className='text-sm py-1 px-4 -m-4 mb-4 bg-gray-700 text-gray-300 rounded-sm'>{props.language}</div>
        <code className={`language-${props.language}`}>
            {props.children}
        </code>
    </pre>
  );
}