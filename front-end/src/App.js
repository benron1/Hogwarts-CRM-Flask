import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./components/StudentsList";
import HouseScore from "./components/HouseScore";
import StudentPage from "./components/StudentPage"
// import { getAllStudents } from "./lib/api";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppContext from "./components/AppContext"
import { getSingleStudent } from "./components/lib/api"


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // studentID: "",
      infoStudent: []
    };
  }



  handleID(studentId) {
    console.log("studentId");
    console.log(studentId);
    // const { studentID } = this.state;
    // this.setState({ loading: true });
    getSingleStudent(studentId).then((response) => {
      this.setState({ infoStudent: response.data })
    })
  }

  render() {

    console.log(this.state.infoStudent);
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <AppContext.Provider
              value={{
                studentId: this.state.studentID,
                infoStudent: this.state.infoStudent,
                getID: (studentId) => {
                  this.handleID(studentId);

                },
              }}
            >
              <Route path="/students">
                <StudentsList />
              </Route>

              <Route path="/score">
                <HouseScore />
              </Route>

              <Route path={`/studentPage`}>
                <StudentPage />
              </Route>
            </AppContext.Provider>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;