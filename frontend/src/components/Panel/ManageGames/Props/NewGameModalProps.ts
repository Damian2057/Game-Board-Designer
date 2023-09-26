import {Game} from "../../../../model/game/game";

export interface NewGameModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (game: Game | null) => void;
}