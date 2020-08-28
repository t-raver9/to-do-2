import { toDoFactory, toDoDom } from './toDo';
import { projectList } from './projectList';
import { LineToLineMappedSource } from 'webpack-sources';

const toDoFormController = (() => {
    let editedToDo = null;
    const toDoFormAdd = () => {
        const button = document.getElementById('addToDoButton');
        const formEl = document.getElementById('toDoForm');
        const toDoCheck = document.getElementById('toDoCheck');
        const toDoNotInterested = document.getElementById('toDoNotInterested');

        button.addEventListener('click', e => {
            formEl.style.display = 'block';
            // Event listeners for adding projects
            toDoCheck.addEventListener('click', addMode);
            toDoNotInterested.addEventListener('click', clearForm);
        });
    };

    const toDoFormEdit = toDo => {
        // 'Open' form
        const formEl = document.getElementById('toDoForm');
        const toDoCheck = document.getElementById('toDoCheck');
        const toDoNotInterested = document.getElementById('toDoNotInterested');
        // Initialise form values from the existing project
        document.getElementById('toDoName').value = toDo.getToDoName();
        document.getElementById('toDoDueDate').value = toDo.getDueDate();
        document.getElementById('toDoDescription').value = toDo.getToDoDescription();
        formEl.style.display = 'block';
        // Create event listener
        editedToDo = toDo;
        toDoCheck.addEventListener('click', editMode);
        toDoNotInterested.addEventListener('click', clearForm);
    }

    const addMode = () => {
        if (checkValidEntry()) {
            let activeProject = projectList.getActiveProject();
            let defaultProject = projectList.getDefaultProject();
            const name = document.getElementById('toDoName').value;
            const date = document.getElementById('toDoDueDate').value;
            const toDoDesc = document.getElementById('toDoDescription').value;
            const toDo = toDoFactory(name, date, toDoDesc);
            if (activeProject.getProjectName() != defaultProject.getProjectName()) {
                activeProject.addToDo(toDo)
            }
            defaultProject.addToDo(toDo);
            toDoDom.addToDo(toDo);
            clearForm();
            // Clear listeners
            toDoCheck.removeEventListener('click', addMode);
            toDoNotInterested.removeEventListener('click', clearForm);
        }
    };

    const editMode = () => {
        let toDo = editedToDo;
        if (checkValidEntry()) {
            let originalName = toDo.getToDoName();
            const name = document.getElementById('toDoName').value;
            const date = document.getElementById('toDoDueDate').value;
            const toDoDesc = document.getElementById('toDoDescription').value;
            toDo.changeToDoName(name);
            toDo.setDueDate(date);
            toDo.setToDoDescription(toDoDesc);
            clearForm();
            // Clear listeners
            toDoCheck.removeEventListener('click', editMode);
            toDoNotInterested.removeEventListener('click', clearForm);
            // Update DOM
            toDoDom.editToDo(toDo, originalName);
        };
    };

    const clearForm = () => {
        const formEl = document.getElementById('toDoForm');
        const toDoName = document.getElementById('toDoName');
        const toDoDueDate = document.getElementById('toDoDueDate');
        const toDoDesc = document.getElementById('toDoDescription');
        toDoName.style.backgroundColor = 'white';
        toDoName.value = '';
        toDoDueDate.value = '';
        toDoDesc.value = '';
        formEl.style.display = 'none';
        toDoCheck.removeEventListener('click', addMode);
        toDoCheck.removeEventListener('click', editMode);
        toDoNotInterested.removeEventListener('click', clearForm);
    };

    const checkValidEntry = () => {
        const toDoName = document.getElementById('toDoName');
        if (toDoName.value) {
            toDoName.style.backgroundColor = 'white';
            return true;
        } else {
            toDoName.style.backgroundColor = '#ff8282';
        }
    }

    return { toDoFormAdd, toDoFormEdit };
})();

export { toDoFormController };