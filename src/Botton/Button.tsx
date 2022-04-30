import React from "react";
import s from "./Button.module.css";

type ButtonType = {
    name: string
    callBack: () => void
    disabled: boolean

}


export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button disabled={props.disabled}
                onClick={onClickHandler}
                className={s.btn}>
            {props.name}
        </button>
    )

}