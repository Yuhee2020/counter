import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./Counter.module.css"
import {Button} from "../Botton/Button";

type PropsType = {
    score: number
    addScore: () => void
    resetScore: () => void
    addStartScore: (startScore: number) => void
}

export const Counter = (props: PropsType) => {

    const [maxScore, setMaxScore] = useState(5)
    const [startScore, setStartScore] = useState(0)
    const [error, setError] = useState("")
    const [error2, setError2] = useState("")


    const addScoreHandler = () => {
        props.addScore()
    }
    const resetScoreHandler = () => {
        props.resetScore()
    }
    const maxScoreHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxScore(Number(e.currentTarget.value))
        Number(e.currentTarget.value) <= startScore || Number(e.currentTarget.value) < 0 || startScore < 0 ? setError("Incorrect value") : setError("")
    }
    const startScoreHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartScore(Number(e.currentTarget.value))
        maxScore <= Number(e.currentTarget.value) || maxScore < 0 || Number(e.currentTarget.value) < 0 ? setError("Incorrect value") : setError("")
    }
    const setHandler = () => {
        props.addStartScore(startScore)
        setError2("")
        localStorage.setItem("maxScore", JSON.stringify(maxScore))
        localStorage.setItem("startScore", JSON.stringify(startScore))
    }
    useEffect(() => {
        let valueAsString = localStorage.getItem("maxScore")
        valueAsString && setMaxScore(JSON.parse(valueAsString))
    }, [])

    useEffect(() => {
        let valueAsString = localStorage.getItem("startScore")
        valueAsString && setStartScore(JSON.parse(valueAsString))
    }, [])

    const onFocusHandler = () => {
        setError2("enter values and press 'set'")
    }

    let scoreValue = props.score.toString()
    if (error2) scoreValue = error2
    if (error) scoreValue = error

    let scoreStyle = s.score
    if (error2) scoreStyle = s.error2
    if (error) scoreStyle = s.error
    if (props.score === maxScore) scoreStyle = s.score5;


    return (
        <div className={s.counter}>
            <div className={s.block}>
                <div className={scoreStyle}> {scoreValue}</div>
                <Button name={"inc"}
                        callBack={addScoreHandler}
                        disabled={props.score === maxScore}/>
                <Button name={"reset"}
                        callBack={resetScoreHandler}
                        disabled={props.score === 0}/>
            </div>
            <div className={s.block}>
                <div className={s.msScore}>max score
                    <input value={maxScore} onFocus={onFocusHandler} type="number" onChange={maxScoreHandler}/>
                </div>
                <div className={s.msScore}>start score
                    <input value={startScore} onFocus={onFocusHandler} type="number" onChange={startScoreHandler}/>
                </div>
                <Button name={"set"} callBack={setHandler} disabled={!!error}/>

            </div>
        </div>
    )
}