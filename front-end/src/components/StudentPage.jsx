import React from "react";
import AppContext from "../components/AppContext";
import "../css/StudentPage.css";
import { withRouter } from 'react-router-dom';
import { getSingleStudent } from "./lib/api"
import PopupOnFocus from "./EditStudent"

class StudentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoStudent: {},
        };

    }

    componentDidMount() {
        let paramsId = this.props.match.params.id
        getSingleStudent(paramsId).then((response) => {
            this.setState({ infoStudent: response.data })
        })

    }

    render() {
        let { infoStudent } = this.state
        console.log(infoStudent)
        return (
            <div>
                {/* <AppContext.Consumer>
                    {({ infoStudent }) => ( */}
                <div>
                    <div className="studentCard">
                        <div>
                            {infoStudent.house === "gryffindor" && (
                                <img
                                    src="https://i.pinimg.com/originals/a1/bf/0a/a1bf0a96a8d25df94e22a1219582f7f7.jpg"
                                    alt="gryffindor"
                                    className="housePic"
                                />
                            )}
                            {infoStudent.house === "ravenclaw" && (
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/I/71FqSSj5S%2BL._AC_SL1400_.jpg"
                                    alt="ravenclaw"
                                    className="housePic"
                                />
                            )}
                            {infoStudent.house === "hufflepuff" && (
                                <img
                                    src="https://www.thestoreofrequirement.com.au/assets/full/2654.jpg?20180330094635"
                                    alt="hufflepuff"
                                    className="housePic"
                                />
                            )}
                            {infoStudent.house === "slytherin" && (
                                <img
                                    src="https://i.pinimg.com/originals/e7/1e/50/e71e509f2d73aca3674b3a550f54ad4d.png"
                                    alt="slytherin"
                                    className="housePic"
                                />
                            )}
                        </div>
                        <div>
                            <h1>
                                {infoStudent.first_name} {infoStudent.last_name}
                            </h1>
                            {/* <p>{infoStudent.house}</p> */}
                            <p>Current Skills: {infoStudent.existing_skills}</p>
                            <p>Desired Skills: {infoStudent.desired_skills}</p>
                            <p>Course Interests: {infoStudent.course_interests}</p>
                            <p>Create Date: {infoStudent.create_date}</p>
                            <p>Last Update: {infoStudent.last_update_time}</p>
                            <p>Student ID: {infoStudent._id}</p>

                            <span>
                                {/* <button className="studentPageBtn"> Edit Student
                                        </button> */}
                                <PopupOnFocus />
                            </span>
                        </div>
                    </div>
                </div>
                {/* )}
                </AppContext.Consumer> */}
            </div>
        );
    }
}

export default withRouter(StudentPage);