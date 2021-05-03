import {CircularProgressbar} from "react-circular-progressbar";
import React, {useState} from "react";

const optimizedPercent = () => {
    const [percentage, setPercentage] = useState(0);



    return (
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    )
}
