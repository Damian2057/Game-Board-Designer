import {Project} from "../../../../model/project/project";
import {Game} from "../../../../model/game/game";

export interface SelectProjectProps {
    onClose: () => void;
    onSave: (project: Project | null) => void;
    game: Game;
}