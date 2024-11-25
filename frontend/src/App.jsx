import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleTextSearch = async () => {
    const response = await axios.post(
      "http://localhost:4001/abexita/professional/search",
      {
        input: text,
      }
    );
    setResults(response.data);
  };

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = async (event) => {
      setIsListening(false);
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      const response = await axios.post(
        "http://localhost:4001/abexita/professional/search",
        {
          input: transcript,
        }
      );
      setResults(response.data);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  console.log("Result", results);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <div style={{ padding: "20px" }}>
        <h1>AI Assistant</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
          style={{ width: "80%", padding: "10px", margin: "10px 0" }}
        />
        <button
          onClick={handleTextSearch}
          style={{ padding: "10px", margin: "10px" }}
        >
          Search
        </button>
        <button
          onClick={handleMicClick}
          style={{ padding: "10px", margin: "10px" }}
        >
          {isListening ? "Listening..." : "Mic"}
        </button>
        <div>
          {results.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h2>{item.name}</h2>
              <p>Rating: {item.rating}</p>
              <p>Category: {item.category}</p>
              <p>Zone: {item.zone.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
