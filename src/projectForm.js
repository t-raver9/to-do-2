import { projectList, projectListDom } from './projectList';
import { projectFactory } from './project';

const projectFormController = (() => {
    let editedProject = null;
    const projectFormAdd = () => {
            const button = document.getElementById('addProjectButton');
            const formEl = document.getElementById('projectForm');
            const check = document.getElementById('check');
            const notInterested = document.getElementById('notInterested');

            button.addEventListener('click', e => {
                formEl.style.display = 'block';
                // Event listeners for adding projects
                check.addEventListener('click', addMode);
                notInterested.addEventListener('click', clearForm);
            });
    };

    const projectFormEdit = project => {
        // 'Open' form
        const formEl = document.getElementById('projectForm');
        const check = document.getElementById('check');
        const notInterested = document.getElementById('notInterested');
        // Initialise form values from the existing project
        document.getElementById('projName').value = project.getProjectName();
        document.getElementById('dueDate').value = project.getDueDate();
        document.getElementById('projDescription').value = project.getProjectDescription();
        formEl.style.display = 'block';
        // Create event listener
        editedProject = project;
        check.addEventListener('click', editMode);
        notInterested.addEventListener('click', clearForm);
    }

    const addMode = () => {
        console.log('add')
        if (checkValidEntry()) {
            const name = document.getElementById('projName').value;
            const date = document.getElementById('dueDate').value;
            const projDesc = document.getElementById('projDescription').value;
            const project = projectFactory(name, date, projDesc);
            projectList.addProject(project);
            clearForm();
            // Clear listeners
            check.removeEventListener('click',addMode);
            notInterested.removeEventListener('click',clearForm);
        }
    };

    const editMode = () => {
        console.log('editing');
        let project = editedProject;
        if (checkValidEntry()) {
            let originalName = project.getProjectName();
            const name = document.getElementById('projName').value;
            const date = document.getElementById('dueDate').value;
            const projDesc = document.getElementById('projDescription').value;
            project.changeProjectName(name);
            project.setDueDate(date);
            project.setProjectDescription(projDesc);
            clearForm();
            // Clear listeners
            check.removeEventListener('click', editMode);
            notInterested.removeEventListener('click', clearForm);
            // Update DOM
            projectListDom.editProject(project, originalName);
        };
    };

    const clearForm = () => {
        const formEl = document.getElementById('projectForm');
        const projName = document.getElementById('projName');
        const date = document.getElementById('dueDate');
        const projDesc = document.getElementById('projDescription');
        projName.style.backgroundColor = 'white';
        projName.value = '';
        date.value = '';
        projDesc.value = '';
        formEl.style.display = 'none';
    }

    const checkValidEntry = () => {
        const projName = document.getElementById('projName');
        if (projName.value) {
            projName.style.backgroundColor = 'white';
            return true;
        } else {
            projName.style.backgroundColor = '#ff8282';
        }
    }

    return { projectFormAdd, projectFormEdit };

})();

export { projectFormController };
