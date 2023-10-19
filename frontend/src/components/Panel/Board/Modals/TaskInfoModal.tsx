import React from "react";
import {TaskInfoProps} from "../Props/TaskInfoProps";
import BoxInfoModal from "../../ManageProjects/Modals/box/BoxInfoModal";
import {Box} from "../../../../model/project/box";
import ElementInfoModal from "../../ManageProjects/Modals/element/ElementInfoModal";
import {ElementEntity} from "../../../../model/project/elementEntity";
import ContainerInfoModal from "../../ManageProjects/Modals/conteiner/ContainerInfoModal";
import {ContainerEntity} from "../../../../model/project/containerEntity";

const TaskInfoModal: React.FC<TaskInfoProps> = ({ show, onHide, task }) => {
    return (
        <div>
            {task.type === 'box' && (
                <BoxInfoModal
                    box={{id: task.id} as Box}
                    onClose={onHide}
                    show={show}
                />
            )}
            {task.type === 'element' && (
                <ElementInfoModal
                    element={{id: task.id} as ElementEntity}
                    onClose={onHide}
                    show={true}
                />
            )}
            {task.type === 'container' && (
                <ContainerInfoModal
                    container={{id: task.id} as ContainerEntity}
                    onClose={onHide}
                    show={true}
                />
            )}
        </div>
    );
}

export default TaskInfoModal;