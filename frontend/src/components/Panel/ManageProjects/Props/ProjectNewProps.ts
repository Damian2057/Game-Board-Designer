import {Project} from "../../../../model/project/project";

export interface ProjectNewProps {
    onClose: () => void;
    onSave: (project: Project | null) => void;
}