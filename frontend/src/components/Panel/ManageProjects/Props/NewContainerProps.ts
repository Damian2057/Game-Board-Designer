import {ContainerEntity} from "../../../../model/project/containerEntity";

export interface NewContainerProps {
    onClose: () => void;
    onSave: (container: ContainerEntity[] | null) => void;
    id: number | null;
}