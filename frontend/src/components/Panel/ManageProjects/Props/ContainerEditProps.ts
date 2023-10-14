import {ContainerEntity} from "../../../../model/project/containerEntity";

export interface ContainerEditProps {
    onClose: () => void;
    onSave: (container: ContainerEntity | null) => void;
    editedContainer: ContainerEntity | null;
    id: number | null;
}