import * as React from "react";
import '../style/visual.less'

function Card(props) {
    console.log(props)
    return (
        <div className="card">
            <div className="card-back"> {props.text[1]} </div>
            <div className="card-front">{props.text[0]}</div>
            </div>
    )
}

export default Card;