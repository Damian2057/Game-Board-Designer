import { GrClose } from "react-icons/gr";
import './IconCircle.css'
import React from "react";
import {IconCircleProps} from "./IconCircleProps";

// @ts-ignore
const IconCircle: React.FC<IconCircleProps> = ({ path }) => {

    return (
        <div className='icon-position'>
            <a /*onClick={goBack}*/ href={path}>
                <div className='icon-circle' >
                    <GrClose />
                </div>
            </a>
        </div>
    )
}
export default IconCircle;