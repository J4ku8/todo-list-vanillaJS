
const tasks = [{
    text: 'úkol1',
    completed: false,
}, {
    text: 'úkol2',
    completed: true,
}, {
    text: 'úkol3',
    completed: true,
}, {
    text: 'úkol4',
    completed: true,
}]

const filters = {
    filterText : '',
    hideCompletedTasks: false
}

const renderTasks = (tasks, filters) => {
    const filteredTasks = tasks.filter((task) =>{
        const filterMatch = task.text.toLowerCase().includes(filters.filterText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompletedTasks || !task.completed
        return filterMatch && hideCompletedMatch
    })
    const tasksEl = document.querySelector('#tasks')
    tasksEl.innerHTML = ''
    filteredTasks.forEach((task) => {
        const taskElement = document.createElement('p')
        const check = document.createElement('input')
        check.type='checkbox'
        task.completed ? check.checked = true : check.checked= false
        taskElement.textContent = task.text
        tasksEl.appendChild(taskElement)
        tasksEl.appendChild(check)
        check.addEventListener('click', ()=>{return task.completed = !task.completed})
    })
}

const filterTasks = (e) => {
    filters.filterText = e.target.value
    renderTasks (tasks, filters)
}

const addTask = (e) => {
    e.preventDefault()
    const newTask = e.target.elements.task
    tasks.push({
        text: newTask.value,
        completed: false,
    })
    renderTasks(tasks, filters)
    newTask.value = ''
}

const hideCompletedTasks = (e) =>{
    filters.hideCompletedTasks = e.target.checked
    renderTasks(tasks, filters)
}

document.querySelector('#filter').addEventListener('input', filterTasks)
document.querySelector('#form').addEventListener('submit', addTask)
document.querySelector('.hide-complete').addEventListener('change', hideCompletedTasks)

renderTasks(tasks, filters)