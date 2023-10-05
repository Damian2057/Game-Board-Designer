import {Project} from "../../../../model/project/project";

export interface ProjectInfoProps {
    project: Project;
    onClose: () => void;
}