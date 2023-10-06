import {Project} from "../../../../model/project/project";

export interface ProjectEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (project: Project | null) => void;
    editedProject: Project | null;
}