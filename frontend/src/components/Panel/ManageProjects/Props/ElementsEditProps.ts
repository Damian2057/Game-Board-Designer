import {ElementEntity} from "../../../../model/project/elementEntity";

export interface ElementsEditProps {
    onClose: () => void;
    onSave: (elements: ElementEntity[] | null) => void;
    editedElements: ElementEntity[] | null;
    id: number | null;
}