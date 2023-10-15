import {ContainerEntity} from "../../../../model/project/containerEntity";

export interface NewContainerNewProps {
    onClose: () => void;
    onSave: (container: ContainerEntity | null) => void;
}