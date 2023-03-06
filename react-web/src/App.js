import './App.css';
import { useState } from 'react'
import onSubmit from './api/api';
import HashLoader from 'react-spinners/HashLoader';

function App() {
  const [apiKey, setApiKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

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
        {/* handles show api key on/off */}
        <div className="text-end">
          <label htmlFor="show-password" className='mb-3 font-bold mr-5'>Show API key:</label>
          <input
            type="checkbox"
            onClick={showPassword}
            id="show-password"
          />
        </div>

        {/* handles text prompt from user */}
        <label htmlFor="input-text" className="mb-2 font-bold">Input Text</label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border-2 rounded-xl border-blue-500 p-3 mb-10 h-auto max-h-none resize-none"
          rows={6}
        ></textarea>

        {/* handles button submit */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white py-3 px-4 rounded text-center w-60 flex justify-center" disabled={loading}>
            
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
            <div className="whitespace-pre-line">{result}</div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
