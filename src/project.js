const projectFactory = projectName => {
        let projectName = projectName
        let toDos = [];
        
        const getProjectName = () => projectName;

        const changeProjectName = newName => {
            projectName = newName;
        };

        const addToDo = toDo => {
                toDos.push(toDo);
        };

        const deleteToDo = toDoName => {
                toDos = toDos.filter(obj => obj.getToDoName() !== toDoName);
        };

        const getToDos = () => toDos;
        return { getProjectName, changeProjectName, addToDo, getToDos, deleteToDo };
};

export { projectFactory };