import {ContainerEntity} from "../../../../model/project/containerEntity";

export interface ContainerEditListProps {
    onClose: () => void;
    onSave: (containers: ContainerEntity[] | null) => void;
    editedContainers: ContainerEntity[] | null;
    id: number | null;
}