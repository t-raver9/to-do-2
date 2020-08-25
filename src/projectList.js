import { projectFactory } from './project';
import { EIDRM } from 'constants';

const projectList = (() => {
    let projects = [];
    let activeProjectIdx = null;

    const instantiateDefaultProject = () => {
        const defaultProject = projectFactory('All Items');
        projects.push(defaultProject);
        projectListDom.instantiateDefaultProject(defaultProject);
    }

    const addProject = project => {
        projects.push(project);
        setActiveProject(project.getProjectName());
        projectListDom.addProject(project);
    }

    const deleteProject = projectName => {
        if (projectName == getActiveProject().getProjectName()) {
            activeProjectIdx = projects ? 0 : null;
        } else if (activeProjectIdx == 0) {
        } else {
            activeProjectIdx -= 1;
        }
        projects = projects.filter(obj => obj.getProjectName() != projectName);
    }

    const findToDo = toDoName => {
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

    const setActiveProject = projectName => {
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
    return { addProject, instantiateDefaultProject, deleteProject, findToDo, setActiveProject, 
        getActiveProject, getProjects };
})();

const projectListDom = (() => {
    const instantiateDefaultProject = (defaultProject) => {
        const defaultProjectDomEl = document.getElementById('projectsContainer').firstElementChild;
        defaultProjectDomEl.addEventListener('click', () => {
            projectList.setActiveProject(defaultProject.getProjectName());
            setActiveProject(defaultProjectDomEl);
        })
    }

    const addProject = project => {
        // Create project element
        const projectContainer = document.getElementById('projectsContainer');
        let projectDomEl = document.createElement('div');
        projectDomEl.textContent = `${project.getProjectName()}`
        projectDomEl.classList.add('project');

        // Make the new project the active project
        projectList.setActiveProject(project.getProjectName());
        setActiveProject(projectDomEl);

        // Add a listener to allow toggling of active project
        projectDomEl.addEventListener('click', () => {
            projectList.setActiveProject(project.getProjectName());
            setActiveProject(projectDomEl);
        });

        // Add due date display
        let daysLeft = (project.getDueDate()) ? daysUntilDue(project.getDueDate()) : 'No date set';
        let dueDateDisplay = document.createElement('div');
        dueDateDisplay.setAttribute('id','dueDateDisplay');
        dueDateDisplay.textContent = daysLeft;
        projectDomEl.appendChild(dueDateDisplay);

        // Add edit button
        let editButton = createEditButton();
        editButton.addEventListener('click', e => {
            editProject(project);
            e.stopPropagation(); // Prevent changing active project
        })
        projectDomEl.appendChild(editButton);

        // Add a delete button
        let deleteButton = createDeleteButton('Project');
        deleteButton.addEventListener('click', e => {
            projectList.deleteProject(project.getProjectName());
            deleteProject(projectDomEl);
            e.stopPropagation(); // Prevent changing active project
        })
        projectDomEl.appendChild(deleteButton);

        // Add to the DOM
        projectContainer.appendChild(projectDomEl);
    };

    const setActiveProject = ((projectDomEl) => {
        // Find existing active project, and remove its active id
        let oldActive = document.getElementById('activeProject');
        oldActive.removeAttribute('id');
        // Add the active id to the new project
        projectDomEl.setAttribute('id', 'activeProject');
    });

    const createEditButton = () => {
        let editButton = document.createElement('span');
        editButton.classList.add('material-icons');
        editButton.classList.add('editButton');
        editButton.innerHTML = 'post_add';
        return editButton;
    }

    const createDeleteButton = () => {
        let deleteButton = document.createElement('i');
        deleteButton.classList.add('fa');
        deleteButton.classList.add('fa-trash');
        return deleteButton;
    };

    const editProject = () => {
        console.log('Editing project...');
    }

    const deleteProject = projectDomEl => {
        // If the project being deleted is the active
        // project, change the active project back to
        // default
        if (projectDomEl.getAttribute('id') === 'activeProject') {
            const projectContainer = document.getElementById('projectsContainer');
            projectContainer.firstElementChild.setAttribute('id','activeProject');
        }
        projectDomEl.parentNode.removeChild(projectDomEl);
    };

    const daysUntilDue = date => {
        const currentDate = new Date();
        const dueYear = date.split('-')[0];
        const dueMonth = date.split('-')[1] - 1; // JS counts months from zero, lol
        const dueDay = date.split('-')[2];
        const due = new Date(dueYear, dueMonth, dueDay);
        const oneDay = 24 * 60 * 60 * 1000;
        let diffDays = Math.round((due - currentDate) / oneDay);
        if (diffDays < 0) {
            return 'Overdue';
        } else if (diffDays > 99) {
            return '> 99 days';
        } else {
            return diffDays.toString(10) + ' days';
        }
    }

    return { addProject, instantiateDefaultProject };
})();

export { projectList };