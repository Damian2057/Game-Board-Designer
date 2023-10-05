import {ContainerEntity} from "../../../../model/project/containerEntity";

export interface ContainerInfoProps {
    container: ContainerEntity;
    onClose: () => void;
    show: boolean;
}