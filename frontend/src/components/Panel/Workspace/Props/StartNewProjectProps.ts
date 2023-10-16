import {Project} from "../../../../model/project/project";

export interface StartNewProjectProps {
    onClose: () => void;
    onSave: (project: Project | null) => void;
}