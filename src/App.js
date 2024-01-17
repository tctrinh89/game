import { useState } from 'react';
import Game from './Game';
import './App.css';

function App() {

  const [showBegin,setShowBegin]=useState(false)
  return (
    <div className="App">
      {showBegin ? 
      <Game /> :
      <button onClick={e=>setShowBegin(!showBegin)}
      style={{width:'250px',height:'30px',margin:'250px auto'}}>
        Phép tính với 2 số
      </button> 
      }
    </div>
  );
}

export default App;
