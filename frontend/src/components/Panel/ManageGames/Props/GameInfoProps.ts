import {Game} from "../../../../model/game/game";

export interface GameInfoProps {
    game: Game;
    onClose: () => void;
}