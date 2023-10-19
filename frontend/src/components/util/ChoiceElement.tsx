import React from 'react';
import './ChoiceElement.css';
import {ChoiceElementProps} from "./ChoiceElementProps";

const ChoiceElement: React.FC<ChoiceElementProps> = ({ name, icon, onClick }) => {

    return (
        <div onClick={onClick} className="purple-square">
            <div className="icon-container">
                {icon}
            </div>
            <p className="text">{name}</p>
        </div>
    );
};

export default ChoiceElement;
