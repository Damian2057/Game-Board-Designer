import {Image} from "../../model/image/image";

export interface UploadProps {
    show: boolean;
    onClose: () => void;
    onSave: (ids: Image[] | null) => void;
}