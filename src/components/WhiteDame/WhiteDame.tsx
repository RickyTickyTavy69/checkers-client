import s from "./WhiteDame.module.css";
import React, {Dispatch, SetStateAction} from "react";
import Rules from "../gameRules/rules";
import {Cell} from "../../types/cell";

interface props{
    setField: Dispatch<SetStateAction<{ number: string; onclick: boolean; dame: "white" | "black" | null; color: "white" | "black"; }[]>>
    number: string
    field: Array<Cell>
}

const WhiteDame: React.FC<props> = ({setField, field, number}) => {

    const selectDame = () => {
        console.log(`dame selected n ${number}`);
        // if one Dame is selected, the map method of an array will be used to change the color of the cell where
        // the dame is selected and then to delete all other selections and then

        //Rules.markMoves() returns two or one black cell(s), which are direct horizontally to the selected black cell.
        const markedNums = Rules.markMoves(number);
        const newField = field.map((cell) => {
            if(cell.number === number){
                cell.onclick = true;
            }
            if(!markedNums.includes(cell.number)){
                cell.markMove = false;
            }
            if(cell.number !== number){
                cell.onclick = false;
            }
            if(markedNums.includes(cell.number) && !cell.dame){
                cell.markMove = true;
            }
            return cell;
        });
        setField(newField);
    }


    return(
        <div onClick={selectDame} className={s.whiteDame}>

        </div>
    )

}

export default WhiteDame