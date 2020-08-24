import { projectList } from "./projectList";

function projectFormController() {
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
                projectList.addProject();
            } else {
                entryNotValid();
            }
        });

        notInterested.addEventListener('click', () => {
            formEl.style.display = 'none';
        });
};

export { projectFormController };
