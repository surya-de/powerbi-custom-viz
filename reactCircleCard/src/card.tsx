import * as React from "react";
import '../style/visual.less'

export interface CardState {
    textLabel: string,
    textValue: string,
    size: number,
    background?: string,
    borderWidth?: number
}

export const initialState: CardState = {
    textLabel: "",
    textValue: "",
    size: 200
}


export class Card extends React.Component<{}, CardState>{

    public CardState: CardState = initialState;

    constructor(props: any){
        super(props);
        this.CardState = initialState;
    }

    render() {
        const { textLabel, textValue, size, background, borderWidth } = this.CardState;
        const style: React.CSSProperties = { width: size, height: size, background, borderWidth };
        return (
            <div className="card" >
                <div className="card-back"> Back </div>
                <div className="card-front"> Front </div>
            </div>
        )
    }
}

export default Card;