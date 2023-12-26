document.addEventListener('DOMContentLoaded', () => {
 // Load tasks from local storage or set default if not available
 let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  { id: 1, title: 'Create a new task', notes: '', completed: false },
  
 ]

 const taskList = document.getElementById('taskList')
 const newTaskInput = document.getElementById('new')
 const newTaskButton = document.getElementById('addTaskButton')
 const showHiddenTasksButton = document.getElementById('showCompleted')

 let showingCompletedTasks = false

 const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
 }

 const addCheckboxListener = (checkbox, task, li) => {
  checkbox.addEventListener('change', () => {
   task.completed = !task.completed
   li.style.display = task.completed ? 'none' : ''
   li.style.opacity = task.completed ? 0.5 : 1
   saveTasks() // Save updated tasks
  })
 }

 const removeCompletedButton = document.getElementById('removeCompleted');

const removeCompletedTasks = () => {
  tasks = tasks.filter(task => !task.completed); // Keep only uncompleted tasks
  saveTasks(); // Save the updated tasks list to local storage

  // Update the displayed task list
  taskList.innerHTML = ''; // Clear the current list
  tasks.forEach(renderTask); // Render the updated list
};

removeCompletedButton.addEventListener('click', removeCompletedTasks);


 const renderTask = (task) => {
  const li = document.createElement('li')
  li.id = `task-li-${task.id}`
    li.className = 'task'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = `task-${task.id}`  
  checkbox.checked = task.completed

  addCheckboxListener(checkbox, task, li)

  const label = document.createElement('label')
  label.htmlFor = `task-${task.id}`
  label.textContent = task.title

  li.appendChild(checkbox)
  li.appendChild(label)
  taskList.appendChild(li)

  if (task.completed) {
   li.style.display = 'none'
  }
 }

 tasks.forEach(renderTask)

 const addTask = () => {
  const taskTitle = newTaskInput.value.trim()
  if (taskTitle) {
   const newTask = { id: tasks.length + 1, title: taskTitle, notes: '', completed: false }
   tasks.push(newTask)
   renderTask(newTask)
   newTaskInput.value = ''
   saveTasks() // Save updated tasks
  }
 }

 newTaskButton.addEventListener('click', addTask)

 newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
   addTask()
  }
 })

 showHiddenTasksButton.addEventListener('click', () => {
  showingCompletedTasks = !showingCompletedTasks
  tasks.forEach((task) => {
   const taskLi = document.getElementById(`task-li-${task.id}`)
   if (task.completed) {
    taskLi.style.display = showingCompletedTasks ? '' : 'none'
   }
  })

  removeCompletedButton.style.display = showingCompletedTasks ? '' : 'none'

  showHiddenTasksButton.textContent = showingCompletedTasks ? 'Hide Completed Tasks' : 'Show Completed Tasks'
 })
})
