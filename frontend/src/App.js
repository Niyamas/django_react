import logo from './logo.svg'
import './css/main.css'

// Default React component
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */





class App extends React.Component {
	render() {

		return(

			<div className="container">
				<div id="task-container">

					{/* Form */}
					<div id="form-wrapper">
						<form id="form">
							<div className="flex-wrapper">
								<div style={{flex: 6}}>
									<input id="title" className="form-control" type="text" name="title" placeholder="Add task.." />
								</div>

								<div style={{flex: 1}}>
									<input id="submit" className="btn btn-warning" type="submit" name="Add" />
								</div>
							</div>
						</form>
					</div>

					<div id="list-wrapper"></div>

				</div>
			</div>

		)
	}
}







export default App
