import { toDoFormController } from './toDoForm';
import { projectListDom, projectList } from './projectList';

const toDoFactory = (name, date, desc) => {
    let toDoName = name;
    let dueDate = date;
    let description = desc;
    let completeStatus = false;

    const getToDoName = () => {
        return toDoName;
    }

    const changeToDoName = newName => {
        toDoName = newName;
    }

    const editToDo = toDo => {
        toDoFormController.toDoFormEdit(toDo);
    }

    const getDueDate = () => {
        return dueDate;
    }

    const setDueDate = newDate => {
        dueDate = newDate;
    }

    const getToDoDescription = () => {
        return description;
    }

    const setToDoDescription = desc => {
        description = desc;
    }

    const getCompleteStatus = () => {
        return completeStatus;
    }

    const updateCompleteStatus = () => {
        completeStatus = !completeStatus;
    }

    return { getToDoName, changeToDoName, editToDo, getDueDate, setDueDate, 
        getToDoDescription, setToDoDescription, getCompleteStatus, updateCompleteStatus };
}

const toDoDom = (() => {
        const addToDo = toDo => {
            console.log('Adding to DOM');
            // Create to-do element
            const toDoContainer = document.getElementById('toDoContainer');
            let toDoDomEl = document.createElement('div');
            toDoDomEl.textContent = `${toDo.getToDoName()}`;
            toDoDomEl.classList.add('toDo');

            // Add checkbox
            let checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            toDoDomEl.appendChild(checkbox);
            // Add checkbox listener to allow status change
            checkbox.addEventListener('click', e => {
                toDo.updateCompleteStatus();
                toggleDoneStatus(toDo, toDoDomEl);
            })

            // Check if the status is done or not done
            if (toDo.getCompleteStatus()) {
                toDoDomEl.classList.add('done');
                checkbox.classList.add('checkboxDone');
            };

            // Add due date display
            let daysLeft = (toDo.getDueDate()) ? projectListDom.daysUntilDue(toDo.getDueDate()) : 'No date set';
            let dueDateDisplay = document.createElement('div');
            dueDateDisplay.classList.add('dueDateDisplay');
            dueDateDisplay.textContent = daysLeft;
            toDoDomEl.appendChild(dueDateDisplay);

            // Add edit button
            let editButton = createEditButton();
            editButton.addEventListener('click', e => {
                toDo.editToDo(toDo);
                e.stopPropagation(); // Prevent changing active project
            })
            toDoDomEl.appendChild(editButton);

            // Add a delete button
            // Need to know the project it sits in
            let defaultProject = projectList.getDefaultProject();
            let project = projectList.findToDo(toDo.getToDoName());
            let deleteButton = createDeleteButton();
            deleteButton.addEventListener('click', e => {
                defaultProject.deleteToDo(toDo.getToDoName()); // Remove data
                project.deleteToDo(toDo.getToDoName()); // Remove data
                deleteToDo(toDoDomEl); // Remove DOM element
                e.stopPropagation(); // Prevent changing active project
            })
            toDoDomEl.appendChild(deleteButton);

            // Add to the DOM
            toDoContainer.appendChild(toDoDomEl);
        };

    const editToDo = (toDo, originalName) => {
        console.log('Editing DOM');
        // Search for this to-do in the DOM
        let toDoDOMs = document.getElementsByClassName('toDo');
        // Update DOM with new details
        for (let i=0; i<toDoDOMs.length; i++) {
            if (originalName == toDoDOMs[i].firstChild.textContent) {
                toDoDOMs[i].firstChild.textContent = `${toDo.getToDoName()}`;
                let dateEls = toDoDOMs[i].getElementsByClassName('dueDateDisplay');
                let dateEl = dateEls[0];
                let daysLeft = (toDo.getDueDate()) ? projectListDom.daysUntilDue(toDo.getDueDate()) : 'No date set';
                dateEl.textContent = daysLeft;
            }
        }
    };

    const createEditButton = () => {
        let editButton = document.createElement('span');
        editButton.classList.add('material-icons');
        editButton.classList.add('editButton');
        editButton.innerHTML = 'post_add';
        return editButton;
    };

    const createDeleteButton = () => {
        let deleteButton = document.createElement('i');
        deleteButton.classList.add('fa');
        deleteButton.classList.add('fa-trash');
        return deleteButton;
    };

    const deleteToDo = toDoDomEl => {
        toDoDomEl.parentNode.removeChild(toDoDomEl);
    };

    const clearToDoDom = () => {
        const toDoContainer = document.getElementById('toDoContainer');
        while (toDoContainer.firstChild) {
            toDoContainer.removeChild(toDoContainer.lastChild);
        }
    };

    const renderToDoDom = () => {
        const activeProject = projectList.getActiveProject();
        console.log(activeProject.getToDos())
        activeProject.getToDos().forEach((toDo) => {
            addToDo(toDo);
        })
    };

    const toggleDoneStatus = (toDo, toDoDomEl) => {
        // Determine if the existing status is done or not done
        let status = toDo.getCompleteStatus();
        // Find the checkbox element
        let checkbox = toDoDomEl.getElementsByClassName('checkbox')[0];
        if (status) {
            toDoDomEl.classList.add('done');
            checkbox.classList.add('checkboxDone');
        }
        else {
            toDoDomEl.classList.remove('done');
            checkbox.classList.remove('checkboxDone');
        }
    }

    return { addToDo, editToDo, clearToDoDom, renderToDoDom };
})();

export { toDoFactory, toDoDom };