import './App.css';
import { useEffect, useState, useRef} from 'react'
import onSubmit from './api/api';
import HashLoader from 'react-spinners/HashLoader';
import parseMarkdown from './parseMarkdown/parseMarkdown';
import getTextareaRowsCount from './dynamicInput/dynamicInput'

function App() {
  const MAX_INPUT_ROWS = 6;
  const MIN_INPUT_ROWS = 1;

  const [apiKey, setApiKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [parsedResult, setParsedResult] = useState("");
  const [rows, setRows] = useState(MIN_INPUT_ROWS);
  const textareaRef = useRef(null);

  // each time a result is recieved from the API,
  // parses it from plain text to elements
  useEffect(() => {
    setParsedResult(parseMarkdown(result));
  }, [result]);

  // gets api key from cookies and local storage and sets it into api key input field
  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(apiKey, inputText, setResult).then(() => {
      setLoading(false);
    });
  }

  // overrides default css for HashLoader spinner
  const override = {
    display: "block",
    margin: "0 auto",
  }

  const showPassword = () => {
    if(checked){
      setChecked(false);
    } else{
      setChecked(true);
    }
  }

  // saves api key to cookies and local storage
  const handleApiKeySave = (e) => {
    e.preventDefault();
    localStorage.setItem('apiKey', apiKey);
  }

  useEffect(() => {
    setRows(getTextareaRowsCount(textareaRef.current));
  }, [inputText]);

  useEffect(() => {
    if (rows >= MAX_INPUT_ROWS) {
      textareaRef.current.style.overflowY = 'scroll';
    } else {
      textareaRef.current.style.overflowY = 'hidden';
    }
  }, [rows]);

  return (
    <div className="container mx-auto py-4 max-w-3xl">

      {/* title */}
      <h1 className="text-4xl font-bold mb-4 text-center">ChatGPT Open UI</h1>

      {/* form container */}
      <form onSubmit={handleSubmit} className="flex flex-col mx-5">

        {/* handles api key input */}
        <label htmlFor="api-key" className="mb-2 font-bold">API Key</label>
        <input
          type={checked ? "text" : "password"}
          id="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border-2 rounded border-blue-400 p-2 mb-1"
        />

        {/* container for show api key checkbox and save api key button */}
        <div className="flex flex-row justify-between mb-6 mt-4">
         {/* handles show api key on/off */} 
          <div className="text-end">
            <label htmlFor="show-password" className='mb-3 font-bold mr-5'>Show API key:</label>
            <input
              type="checkbox"
              onClick={showPassword}
              id="show-password"
            />
          </div>

          <div>
            <button
              onClick={handleApiKeySave}
              className="bg-blue-500 text-white py-1 px-2 rounded text-center w-50 text-md flex justify-center hover:bg-blue-800"
            >
              Save API Key
            </button>
          </div>
        </div>


        {/* handles text prompt from user */}
        <label htmlFor="input-text" className="mb-2 font-bold">Input Text</label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border-2 rounded-xl border-blue-500 p-3 mb-10 h-auto max-h-none resize-none"
          rows={rows > MAX_INPUT_ROWS ? MAX_INPUT_ROWS : rows}
          ref={textareaRef}
        ></textarea>

        {/* handles button submit */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white py-3 px-4 rounded text-center w-60 flex justify-center hover:bg-blue-800" disabled={loading}>
            
            {/* when loading spinner is displayed, otherwise button is enabled */}
            {loading ? 
              <HashLoader 
                color="white"
                loading={loading}
                size={25}
                aria-label="Loading"
                cssOverride={override}
              /> : <div className="font-bold">Ask nicely</div>
            }
          </button>
        </div>
      </form>
      
      {/* result display */}
      <div>
        {result && (
          <h2 className="font-bold mb-2 mx-4 mt-6">Result</h2>
        )}
        {result && (
          <div className="border-2 rounded-xl border-blue-400 p-4 mt-2 mx-4">
            <div className="whitespace-pre-line">{parsedResult}</div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
