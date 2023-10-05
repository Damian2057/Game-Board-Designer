import {Element} from "../../../../model/project/element";
export interface ElementInfoProps {
    element: Element;
    onClose: () => void;
    show: boolean;
}