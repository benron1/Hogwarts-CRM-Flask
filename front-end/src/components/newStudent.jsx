import React from "react";
import Popup from "reactjs-popup";
import { Button, Form } from "react-bootstrap";
import { addStudent } from "./lib/api.js";
import "../css/NewStudent.css";

class PopupOnFocus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            house: "",
            existing_skills: [],
            desired_skills: "",
            course_interests: "",
        };
    }

    handleOnSubmit() {
        addStudent(this.state)
    }


    render() {
        console.log(this.state.existing_skills)

        return (
            <Popup
                trigger={
                    <Button variant="primary" className="addBtn">
                        {" "}
                        Add Student{" "}
                    </Button>
                }
                modal
                closeOnDocumentClick
            >
                {/* <Form onSubmit={this.handleOnSubmit}> */}
                <Form className="popUpForm" onSubmit={(event) => this.handleOnSubmit(event)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            placeholder="Enter First Name"
                            onChange={(event) =>
                                this.setState({ first_name: event.target.value.toLowerCase() })
                            }
                        />
                        <Form.Text className="RequiredText">*Required Text</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                            onChange={(event) =>
                                this.setState({ last_name: event.target.value.toLowerCase() })
                            }
                        />
                        <Form.Text className="RequiredText">*Required Text</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>House</Form.Label>
                        <Form.Control
                            type="text"
                            name="house"
                            placeholder="Enter House"
                            onChange={(event) =>
                                this.setState({ house: event.target.value.toLowerCase() })
                            }
                        />
                        <Form.Text className="RequiredText">*Required Text</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Existing skills</Form.Label>
                        <Form.Control
                            type="text"
                            name="existing_skills"
                            placeholder="Enter Current skills"
                            onChange={(event) => this.setState({ existing_skills: [...this.state.existing_skills, event.target.value.toLowerCase()] })}


                        />
                    </Form.Group>
                    {/* change name */}

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Desired skills</Form.Label>
                        <Form.Control
                            type="text"
                            name="desired_skills"
                            placeholder="Enter Desired skills"
                            onChange={(event) => this.setState({ desired_skills: event.target.value.toLowerCase() })}

                        />
                    </Form.Group>
                    {/* change name */}

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Course Interests</Form.Label>
                        <Form.Control
                            type="text"
                            name="course_interests"
                            placeholder="Enter Course Interests"
                            onChange={(event) => this.setState({ course_interests: event.target.value.toLowerCase() })}

                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
					</Button>
                </Form>
            </Popup>
        );
    }
}

export default PopupOnFocus;



    // async handleOnSubmit(event) {
    //     event.preventDefault();
    //     let student = {
    //             "first_name": this.state.first_name,
    //             "last_name": this.state.last_name,
    //             "house": this.state.house,
    //             "current_magic_skills": this.state.current_magic_skills,
    //             "want_skills": this.state.want_skills,
    //             "course_interests": this.state.course_interests
    //         }
    //     console.log(student)
    //     const response = await addStudent(student);
    //     }
