class Rules{
    //by now this function just looks up two black cells direct horizontally to the selected cellNumber.
    static markMoves(cellNumber: string) : string[]{
        const letter = cellNumber[0];
        const number = cellNumber[1];

        switch(letter){
            case "a":
                return ["b" + ((+number + 1).toString())];
            case "h":
                return ["g" + ((+number + 1).toString())];
            default:
                return [String.fromCharCode(+letter.charCodeAt(0) +1) + ((+number + 1).toString()), String.fromCharCode(+letter.charCodeAt(0) -1) + ((+number + 1).toString())  ]
        }

    }
}

export default Rules;