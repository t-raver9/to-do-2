const projectList = (() => {
    let projects = [];
    let activeProjectIdx = null;

    const addProject = (project) => {
        projects.push(project);
        setActiveProject(project.getProjectName());
    }

    const deleteProject = (projectName) => {
        if (projectName == getActiveProject().getProjectName()) {
            activeProjectIdx = projects ? 0 : null;
        } else if (activeProjectIdx == 0) {
        } else {
            activeProjectIdx -= 1;
        }
        projects = projects.filter(obj => obj.getProjectName() != projectName);
    }

    const findToDo = (toDoName) => {
        for (let i=0; i<projects.length; i++) {
            let project = projects[i];
            for (let j=0; j<project.getToDos().length; j++) {
                let toDo = project.getToDos()[j];
                if (toDo.getToDoName() == toDoName) {
                    return project;
                }
            }
        }
        return null;
    }

    const setActiveProject = (projectName) => {
        if (projects) {
            projects.forEach((project, i) => {
                if (project.getProjectName() == projectName) {
                    activeProjectIdx = i;
                }
            })
        } else {
            activeProjectIdx = null;
        }
    }

    const getActiveProject = () => {
        return (activeProjectIdx != null ) ? projects[activeProjectIdx] : null;
    }

    const getProjects = () => {
        return projects;
    }
    return { addProject, deleteProject, findToDo, setActiveProject, 
        getActiveProject, getProjects };
})();

export { projectList };