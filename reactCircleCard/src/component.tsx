import * as React from "react";
import Card from './card'

export interface State {
    //textbackLabel: string,
    //textbackValue: string,
    textfrontLabel: string,
    textfrontValue: string,
    size: number,
    background?: string,
    borderWidth?: number
}

export const initialState: State = {
    //textbackLabel: "",
    //textbackValue: "",
    textfrontLabel: "",
    textfrontValue: "",
    size: 200
}

export class ReactCircleCard extends React.Component<{}, State>{
    
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if(typeof ReactCircleCard.updateCallback === 'function'){
            ReactCircleCard.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        ReactCircleCard.updateCallback = (newState: State): void => { this.setState(newState); };
    }

    public componentWillUnmount() {
        ReactCircleCard.updateCallback = null;
    }

    constructor(props: any){
        super(props);
        this.state = initialState;
    }

    render(){
        const { textfrontLabel, textfrontValue, size, background, borderWidth } = this.state;
        const style: React.CSSProperties = { width: size, height: size, background, borderWidth };

        return (
            <div className="circleCard" style={style}>
                <Card text = {textfrontValue}/>
            </div>
        )
    }
}

export default ReactCircleCard;