import React from "react";
import {PriorityProps} from "../Props/PriorityProps";
import {FcHighPriority, FcLowPriority, FcMediumPriority} from "react-icons/fc";

const PriorityModal: React.FC<PriorityProps> = ({ priority }) => {
    return (
        <p className="text-slate-400 text-sm inline-flex items-center">
            {priority === 'A' && (
                <FcHighPriority size={30} />
            )}
            {priority === 'B' && (
                <FcMediumPriority size={30} />
            )}
            {priority === 'C' && (
                <FcLowPriority size={30} />
            )}
            {priority}
        </p>
    )
}

export default PriorityModal;