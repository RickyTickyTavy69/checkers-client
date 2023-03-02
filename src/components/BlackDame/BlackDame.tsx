import s from "./BlackDame.module.css";
import React, {Dispatch, SetStateAction} from "react";

interface props{
    setField: Dispatch<SetStateAction<{ number: string; onclick: boolean; dame: "white" | "black" | null; color: "white" | "black"; }[]>>
    number: string
    field: Array<{
        number: string
        onclick: boolean
        dame: "white" | "black" | null
        color: "white" | "black"
    }>
}

const BlackDame: React.FC<props> = ({setField, field, number}) => {


    return(
        <div className={s.blackDame}>

        </div>
    )
}

export default BlackDame;