import * as React from "react";
import '../style/visual.less'

function Card(props) {
    console.log(props)
    return (
        <div className="card">
            <div className="card-back"> {props.text} </div>
            <div className="card-front">Front</div>
            </div>
    )
}

export default Card;