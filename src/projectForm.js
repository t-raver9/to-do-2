function showProjectForm() {
        const button = document.getElementById('addProjectButton');
        const formEl = document.getElementById('projectForm');
        formEl.style.display = 'none';
        button.addEventListener('click', () => {
                if (formEl.style.display === 'none') {
                        formEl.style.display = 'block';
                } else {
                        formEl.style.display = 'none';
                }
        });
}

export { showProjectForm };
