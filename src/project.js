const projectFactory = (name, date = null, description = null) => {
        let projectName = name
        let dueDate = date;
        let projectDescription = description;
        let toDos = [];

        const getProjectName = () => projectName;

        const changeProjectName = newName => {
            projectName = newName;
        };

        const setDueDate = (date) => {
                dueDate = date;
        }

        const getDueDate = () => {
                return dueDate;
        }

        const setProjectDescription = (description) => {
                projectDescription = description;
        }

        const getProjectDescription = () => {
                return projectDescription;
        }

        const addToDo = toDo => {
                toDos.push(toDo);
        };

        const deleteToDo = toDoName => {
                toDos = toDos.filter(obj => obj.getToDoName() !== toDoName);
        };

        const getToDos = () => toDos;
        return { getProjectName, changeProjectName, setDueDate, getDueDate,
                setProjectDescription, getProjectDescription, addToDo,
                getToDos, deleteToDo };
};

export { projectFactory };