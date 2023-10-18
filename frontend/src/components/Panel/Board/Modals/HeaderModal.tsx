import React from "react";
import {HeaderProps} from "../Props/HeaderProps";

const HeaderModal: React.FC<HeaderProps> = ({ text, bgColor, count }) => {
    return <div className={`${bgColor} flex items-center h-12 w-64 pl-2 rounded-md uppercase text-white`}>
        <h2 className='m-0'>{text}</h2>
        <div className='ml-4 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center'>{count}</div>
    </div>
}

export default HeaderModal