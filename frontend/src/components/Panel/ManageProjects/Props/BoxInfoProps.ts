import {Box} from "../../../../model/project/box";

export interface BoxInfoProps {
    box: Box;
    onClose: () => void;
    show: boolean;
}