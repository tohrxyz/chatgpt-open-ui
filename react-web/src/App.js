import './App.css';
import { useState } from 'react'
import onSubmit from './api/api';
import HashLoader from 'react-spinners/HashLoader';

function App() {
  const [apiKey, setApiKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container mx-auto py-4 max-w-3xl">

      <h1 className="text-4xl font-bold mb-4 text-center">ChatGPT Open UI</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <label htmlFor="api-key" className="mb-2 font-bold">API Key:</label>
        <input
          type="text"
          id="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border border-gray-400 p-2 mb-4"
        />

        <label htmlFor="input-text" className="mb-2 font-bold">Input Text:</label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-400 p-2 mb-4"
        ></textarea>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white py-3 px-4 rounded text-center w-60 flex justify-center" disabled={loading}>
            {loading ? 
              <HashLoader 
                color="white"
                loading={loading}
                size={25}
                aria-label="Loading"
                cssOverride={override}
              /> : <div>Submit</div>
            }
          </button>
        </div>
      </form>
      
      {result && (
        <div className="border border-gray-400 p-4 mt-4 mx-4">
          <h2 className="font-bold mb-2">Result:</h2>
          <p>{result}</p>
        </div>
      )}

      
    </div>
  );
}

export default App;
