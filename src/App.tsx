import React, {useState} from 'react';
import './App.css';
import {Counter} from "./Counter/Counter";


function App() {


    const [score, setScore] = useState<number>(0)


    const addScore = () => {
        setScore(score + 1)
    }

    const resetScore = () => {
        setScore(0)
    }

    const addStartScore = (startScore: number) => {
        setScore(startScore)
    }


    return (
        <div className="App">
            <Counter score={score}
                     addScore={addScore}
                     resetScore={resetScore}
                     addStartScore={addStartScore}
            />


        </div>
    );
}

export default App;
