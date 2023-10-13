import {ElementEntity} from "../../../../model/project/elementEntity";
export interface ElementInfoProps {
    element: ElementEntity;
    onClose: () => void;
    show: boolean;
}