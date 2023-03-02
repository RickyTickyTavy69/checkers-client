import WhiteDame from "../WhiteDame/WhiteDame";
import BlackDame from "../BlackDame/BlackDame";

import s from "./board.module.css"
import {useEffect, useState} from "react";
import CellComponent from "../CellComponent/CellComponent";


//import websocket from "../../utilits/websocket";

//import types
import {Cell} from "../../types/cell";
import user from "../UsersList/User/User";

const BoardComponent = () => {

    const [field, setField] = useState<Array<Cell>>([
        {number: "a8", onclick: false, dame: null, color: "white"}, {number: "b8", onclick: false, dame: "black", color: "black", markMove: false}, {number: "c8", onclick: false, dame: null, color: "white"},
        {number: "d8", onclick: false, dame: "black", color: "black", markMove: false}, {number: "e8", onclick: false, dame: null, color: "white"}, {number: "f8", onclick: false, dame: "black", color: "black", markMove: false},
        {number: "g8", onclick: false, dame: null, color: "white"}, {number: "h8", onclick: false, dame: "black", color: "black", markMove: false}, {number: "a7", onclick: false, dame: "black", color: "black" , markMove: false},
        {number: "b7", onclick: false, dame: null, color: "white"}, {number: "c7", onclick: false, dame: "black", color: "black" , markMove: false}, {number: "d7", onclick: false, dame: null, color: "white"},
        {number: "e7", onclick: false, dame: "black", color: "black" , markMove: false}, {number: "f7", onclick: false, dame: null, color: "white"}, {number: "g7", onclick: false, dame: "black", color: "black" , markMove: false},
        {number: "h7", onclick: false, dame: null, color: "white"}, {number: "a6", onclick: false, dame: null, color: "white"}, {number: "b6", onclick: false, dame: "black", color: "black" , markMove: false},
        {number: "c6", onclick: false, dame: null, color: "white"}, {number: "d6", onclick: false, dame: "black", color: "black" , markMove: false}, {number: "e6", onclick: false, dame: null, color: "white"},
        {number: "f6", onclick: false, dame: "black", color: "black" , markMove: false}, {number: "g6", onclick: false, dame: null, color: "white"}, {number: "h6", onclick: false, dame: "black", color: "black" , markMove: false},
        {number: "a5", onclick: false, dame: null, color: "black" , markMove: false}, {number: "b5", onclick: false, dame: null, color: "white"}, {number: "c5", onclick: false, dame: null, color: "black" , markMove: false},
        {number: "d5", onclick: false, dame: null, color: "white"}, {number: "e5", onclick: false, dame: null, color: "black" , markMove: false}, {number: "f5", onclick: false, dame: null, color: "white"},
        {number: "g5", onclick: false, dame: null, color: "black" , markMove: false}, {number: "h5", onclick: false, dame: null, color: "white"}, {number: "a4", onclick: false, dame: null, color: "white"},
        {number: "b4", onclick: false, dame: null, color: "black" , markMove: false}, {number: "c4", onclick: false, dame: null, color: "white"}, {number: "d4", onclick: false, dame: null, color: "black" , markMove: false},
        {number: "e4", onclick: false, dame: null, color: "white"}, {number: "f4", onclick: false, dame: null, color: "black" , markMove: false}, {number: "g4", onclick: false, dame: null, color: "white"},
        {number: "h4", onclick: false, dame: null, color: "black" , markMove: false}, {number: "a3", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "b3", onclick: false, dame: null, color: "white"},
        {number: "c3", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "d3", onclick: false, dame: null, color: "white"}, {number: "e3", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "f3", onclick: false, dame: null, color: "white"},
        {number: "g3", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "h3", onclick: false, dame: null, color: "white"}, {number: "a2", onclick: false, dame: null, color: "white"},
        {number: "b2", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "c2", onclick: false, dame: null, color: "white"}, {number: "d2", onclick: false, dame: "white", color: "black" , markMove: false},
        {number: "e2", onclick: false, dame: null, color: "white"}, {number: "f2", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "g2", onclick: false, dame: null, color: "white"},
        {number: "h2", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "a1", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "b1", onclick: false, dame: null, color: "white"},
        {number: "c1", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "d1", onclick: false, dame: null, color: "white"}, {number: "e1", onclick: false, dame: "white", color: "black" , markMove: false},
        {number: "f1", onclick: false, dame: null, color: "white"}, {number: "g1", onclick: false, dame: "white", color: "black" , markMove: false}, {number: "h1", onclick: false, dame: null, color: "white"},
    ]);



    useEffect(() => {
        /*const username = localStorage.getItem("username");
        if(username){
            const updateObj = JSON.stringify(

                {
                    method: "fieldUpdate",
                    message: "move",
                    id: "555",
                    username,
                    field,
                }
            );
            websocket.send(updateObj);
        }*/
    }, [field])

    return(
        <div className={s.boardContainer}>
        <div className={s.board}>
            <div className={s.markleft}>
                <div className={s.mark}>8</div>
                <div className={s.mark}>7</div>
                <div className={s.mark}>6</div>
                <div className={s.mark}>5</div>
                <div className={s.mark}>4</div>
                <div className={s.mark}>3</div>
                <div className={s.mark}>2</div>
                <div className={s.mark}>1</div>
            </div>
            <div className="board">
                {field.map((cell) => {
                    return(
                        <CellComponent key={cell.number} field={field} setField={setField} number={cell.number} click={cell.onclick} dame={cell.dame} color={cell.color} markMove={cell.markMove}/>
                    )
                })}
            </div>
        </div>
            <div className={s.markdown}>
                <div className={s.mark}>A</div>
                <div className={s.mark}>B</div>
                <div className={s.mark}>C</div>
                <div className={s.mark}>D</div>
                <div className={s.mark}>E</div>
                <div className={s.mark}>F</div>
                <div className={s.mark}>G</div>
                <div className={s.mark}>H</div>
            </div>
        </div>
    )
}

export default BoardComponent;