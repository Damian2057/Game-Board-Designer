import {Game} from "../../../../model/game/game";

export interface GameEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (game: Game | null) => void;
    editedGame: Game | null;
}