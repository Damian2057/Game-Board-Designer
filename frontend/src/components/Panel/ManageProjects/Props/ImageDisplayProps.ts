import {ImageSliderProps} from "./ImageSliderProps";

export interface ImageDisplayProps extends ImageSliderProps {
    onSave: (ids: number[] | null) => void;
}