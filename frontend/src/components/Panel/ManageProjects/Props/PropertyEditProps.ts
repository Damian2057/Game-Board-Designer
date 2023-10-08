import {Property} from "../../../../model/project/property";

export interface PropertyEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (editedProp: Property | null) => void;
    editedProp: Property | null;
}