import { projectList } from './projectList';
import { projectFactory } from './project';

const projectFormController = (() => {
    function showProjectForm() {
            const button = document.getElementById('addProjectButton');
            const formEl = document.getElementById('projectForm');
            const check = document.getElementById('check');
            const notInterested = document.getElementById('notInterested');

            formEl.style.display = 'none';
            button.addEventListener('click', () => {
                    if (formEl.style.display === 'none') {
                            formEl.style.display = 'block';
                    } else {
                            formEl.style.display = 'none';
                    }
            });

            check.addEventListener('click', () => {
                if (checkValidEntry()) {
                    const name = document.getElementById('projName').value;
                    const date = document.getElementById('dueDate').value;
                    const projDesc = document.getElementById('projDescription').value;
                    const project = projectFactory(name, date, projDesc);
                    projectList.addProject(project);
                    clearForm();
                    formEl.style.display = 'none';
                }
            });

            notInterested.addEventListener('click', () => {
                clearForm();
                formEl.style.display = 'none';
            });
    };

    const checkValidEntry = () => {
        const projName = document.getElementById('projName');
        if (projName.value) {
            projName.style.backgroundColor = 'white';
            return true;
        } else {
            projName.style.backgroundColor = '#ff8282';
        }
    }

    const clearForm = () => {
        const projName = document.getElementById('projName');
        const date = document.getElementById('dueDate');
        const projDesc = document.getElementById('projDescription');
        projName.style.backgroundColor = 'white';
        projName.value = '';
        date.value = '';
        projDesc.value = '';
    }

    return { showProjectForm };

})();

export { projectFormController };
