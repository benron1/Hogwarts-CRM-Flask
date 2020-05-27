import React from "react";
import "./App.css";
import StudentsList from "./components/StudentsList";
import HouseScore from "./components/HouseScore";
// import { getAllStudents } from "./lib/api";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: false,
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/students">
              <StudentsList />
            </Route>
            <Route path="/score">
              <HouseScore />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

//I get a bat request from my axios when I try to  add a new student

// refresh the page after deleteStudent

