import './App.css';
import { useState } from 'react'
import onSubmit from './api/api';

function App() {
  const [apiKey, setApiKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(apiKey, inputText, setResult, setIsLoading);
  }
  return (
    <div className="container mx-auto py-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-center">ChatGPT Open UI</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <label htmlFor="api-key" className="mb-2 font-bold">
          API Key:
        </label>
        <input
          type="text"
          id="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border border-gray-400 p-2 mb-4"
        />
        <label htmlFor="input-text" className="mb-2 font-bold">
          Input Text:
        </label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-400 p-2 mb-4"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
      {isLoading && <div className="border border-gray-400 p-4 mt-4 mx-4">Loading...</div>}
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