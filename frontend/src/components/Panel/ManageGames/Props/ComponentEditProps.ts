import {Component} from "../../../../model/game/component";

export interface ComponentEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (editedComponent: Component | null) => void;
    editedComponent: Component | null;
}