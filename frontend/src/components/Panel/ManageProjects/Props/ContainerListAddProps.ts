import {ContainerEntity} from "../../../../model/project/containerEntity";

export interface ContainerListAddProps {
    onClose: () => void;
    onSave: (containers: ContainerEntity[] | null) => void;
    editedContainers: ContainerEntity[] | null;
}