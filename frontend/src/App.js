import React from 'react'
import './static/css/main.css'
import { csrftoken } from './shared/get_cookies.js'

// Import components
//import TasksUI from './home/tasks_ui.js'

// @todo: continue at @36:09 https://www.youtube.com/watch?v=w7ejDZ8SWv8


export default class App extends React.Component {

	constructor(props) {

		super(props)

		// States add "reactive" flair. Can change asynchronously.
		this.state = {

			todoList: [],
			activeTask: {
				id: null,
				title: '',
				completed: false,
			},
			editing: false
		}

		// Bind methods
		this.fetchTasks = this.fetchTasks.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.startEdit = this.startEdit.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.strikeUnstrike = this.strikeUnstrike.bind(this)
	}

	componentDidMount() {
		/**
		 * Docs: https://reactjs.org/docs/react-component.html#componentdidmount
		 */

		this.fetchTasks()
	}

	

	fetchTasks() {
		/**
		 * Get the list of tasks using fetch API.
		 * 
		 * Will show an error: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://127.0.0.1:8000/api/vi/task-list/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
		 * 
		 * Need to add the package: django-cors-headers
		 */
		console.log('running fetchTasks()...')

		let url = 'http://localhost:8000/api/v1/task-list/'
		fetch(url)
		.then( (response) => response.json() )
		.then( (data) => {

			//onsole.log('Tasks data:', data)

			// Append tasks to the todoList in this.state (in the constructor method)
			this.setState({
				todoList: data
			})

		})
	}


	handleChange(event) {
		/**
		 * Handles changes in this.state.
		 */
		
		let name = event.target.name
		let value = event.target.value

		console.log('name:', name, 'value:', value)

		this.setState({

			activeTask: {

				// Spread operator to update child elements. Removes the array or list?
				// Takes all elements in an array or list and passes them individually as arguments.
				...this.state.activeTask,
				title: value,
			}
		})

	}


	handleSubmit(event) {
		/**
		 * Handles form submission. Updates via the fetch API (POST data).
		 * 
		 * ALso handles title updates if the user clicks the edit button, the
		 * state changes so that editing=true. Upon form submission, will send a PUT
		 * request to update the title of the task rather than create a new one.
		 */

		// Stops the form from submitting. Do manual submission.
		event.preventDefault()

		console.log('task', this.state.activeTask)

		// Default behavior. Allows the user to create a new task after submitting the form
		if (this.state.editing === false) {

			// Create object in API after the user submits the form.
			let url = 'http://localhost:8000/api/v1/task-list/'
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify(
					{
						'title': this.state.activeTask.title,
						//'completed': this.state.activeTask.completed
					}
				)
			})
			.then( (response) => {
	
				// Update the task list after submitting a task via the form
				this.fetchTasks()
	
				// After submitting the form, update the state
				this.setState({
	
					todoList: [],
					activeTask: {
						id: null,
						title: '',
						completed: false,
					},
					editing: false
				})
			})
			.catch( (error) => {
	
				console.log('Error in handleSubmt(event):', error)
			})

		}
		// Update url to use the task update API endpoint if editing is set to true (when user clicks the edit button).
		else {

			// If the editing button is clicked, 
			let url = `http://localhost:8000/api/v1/task-detail/${ this.state.activeTask.id }/`
			this.setState({

				editing: false
			})

			fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify(
					{
						'title': this.state.activeTask.title,
						//'completed': this.state.activeTask.completed
					}
				)
			})
			.then( (response) => {
	
				// Update the task list after submitting a task via the form
				this.fetchTasks()
	
				// After submitting the form, update the state
				this.setState({
	
					todoList: [],
					activeTask: {
						id: null,
						title: '',
						completed: false,
					},
					editing: false
				})
			})
			.catch( (error) => {
	
				console.log('Error in handleSubmt(event):', error)
			})

		}

	}



	startEdit(task) {
		/**
		 * When the user clicks the edit button, the state will change and will
		 * display the task title in the form and set editing=true, so that when
		 * the form is submitted, a PUT request is sent to update the title rather
		 * than create a new task.
		 */

		// Update state
		this.setState({

			activeTask: task,
			editing: true,
		})
	}


	deleteTask(task) {
		/**
		 * Deletes the task when the user clicks on the remove button.
		 */

		console.log('testing:', task)

		let url = `http://localhost:8000/api/v1/task-detail/${ task.id }/`
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
		})
		.then( (response) => {

			// Reload all tasks after deleting the task
			this.fetchTasks()
		})
		.catch( (error) => {

			console.log('Error while running deleteItem(task):', error)
		})

	}


	strikeUnstrike(task) {
		/**
		 * Updates the completed status to be the opposite of what it is currently in the API.
		 * When the user clicks the title of a task, it will show a strikethrough. If there's one already,
		 * remove the strikethrough.
		 */

		// Switch from true to false, or from false to true
		task.completed = !task.completed

		console.log('task completed:', task.completed)

		let url = `http://localhost:8000/api/v1/task-detail/${ task.id }/`
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				'X-CSRFToken': csrftoken
			},
			body: JSON.stringify(
				{
					'title': task.title,
					'completed': task.completed
				}
			)
		})
		.then( (response) => {

			console.log('response:', response)

			// After clicking on the title of a task, update the task list to show the new state
			this.fetchTasks()
		})
		.catch( (error) => {

			console.log('Error while running strikeUnstrike(task):', error)
		})


	}






	render() {

		// Grab all of the tasks fetched by through the API for use in rendering this template.
		let tasks = this.state.todoList

		// Let's the inner loops have access to the original this variable.
		let superthis = this

		return(

			<div className="container">
				<div id="task-container">

					<div id="form-wrapper">
						<form id="form" onSubmit={this.handleSubmit}>
							<div className="flex-wrapper">
								<div style={{flex: 6}}>
									{/* value clears the form after submitting */}
									<input id="title" className="form-control" onChange={this.handleChange} value={this.state.activeTask.title} type="text" name="title" placeholder="Add task.." />
								</div>

								<div style={{flex: 1}}>
									<input id="submit" className="btn btn-warning" type="submit" name="Add" />
								</div>
							</div>
						</form>
					</div>

					<div id="list-wrapper">

						{/* For each task, add a new task section under the form. */}
						{ tasks.map( (task, index) => {

							return (
								<div className="task-wrapper flex-wrapper" key={index}>
									<div onClick={ () => superthis.strikeUnstrike(task) } style={{ flex:7 }}>

										
										{task.completed == false ? (
											
											<span>{task.title}</span>
										) : (

											<strike>{task.title}</strike>
										)}

									</div>

									<div style={{ flex:1 }}>
										<button onClick={ () => { superthis.startEdit(task) } } className="btn btn-sm btn-outline-info">Edit</button>
									</div>

									<div style={{ flex:1 }}>
										<button onClick={ () => { superthis.deleteTask(task) } } className="btn btn-sm btn-outline-dark delete">Remove</button>
									</div>
								</div>
							)

						}) }

					</div>

				</div>
			</div>

		)
	}
}


// Add this functionality when calling the class above.
// export default App
