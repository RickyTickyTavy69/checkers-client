import WhiteDame from "../WhiteDame/WhiteDame";
import BlackDame from "../BlackDame/BlackDame";

import React, {Dispatch, MouseEventHandler, SetStateAction} from "react";
import {Cell} from "../../types/cell";

interface props{
    number: string
    click: boolean
    markMove: boolean | undefined
    dame: "white" | "black" | null
    color: "white" | "black"
    setField: Dispatch<SetStateAction<{ number: string; onclick: boolean; dame: "white" | "black" | null; color: "white" | "black"; }[]>>
    field: Array<Cell>
}

const CellComponent: React.FC<props> = ({number, click, markMove, dame, color, setField, field}) => {

    // function checks if the field is marked with green and if true, moves the dame to this field
    const moveDame = (event: React.MouseEvent<HTMLElement>) => {
        const targetHTML = event.target as HTMLElement;
        if(targetHTML.classList.contains("markMove")){
            console.log(`move ${dame} dame to ${number}`)

            // finds a color of a dame which is moved
            let color: "white" | "black" | null;
            field.forEach((cell) => {
                if(cell.onclick){
                    color = cell.dame;
                }
            })
            // ...found a color of a moved dame

            const newField = field.map((cell) => {
                if(cell.number === number){
                    cell.dame = color;
                }
                if(cell.onclick){
                    cell.dame = null;
                    cell.onclick = false;
                }
                if(cell.markMove){
                    cell.markMove = false;
                }
                return cell;
            });
            setField(newField);
        }
    }
    // function above checks if the field is marked with green and if true, moves the dame to this field

    return(
        // when Field (BoardComponent) Component is rendered again, each cell gets the options click and markMove, which
        // are used to set styles of each cell.
        <div onClick={(event) => moveDame(event)} className={`cell ${color} ${click && "clicked"} ${markMove && "markMove"}`}>
            {dame === "white" && <WhiteDame field={field} number={number} setField={setField}/>}
            {dame === "black" && <BlackDame field={field} number={number} setField={setField}/>}
        </div>
    )

}

export default CellComponent;