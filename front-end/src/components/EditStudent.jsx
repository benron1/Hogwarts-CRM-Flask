import React from "react";
import Popup from "reactjs-popup";
import { Button, Form } from "react-bootstrap";
import "../css/NewStudent.css";
import { withRouter } from "react-router-dom";
import { getSingleStudent, setUserSkills } from "./lib/api";
import "../css/EditStudent.css";

class PopupOnFocus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoStudent: {},
            existing_skills: [],
            input_value: ''
        };
    }

    handleOnSubmit(event) {
        event.preventDefault()
        let { infoStudent, existing_skills } = this.state;
        console.log(infoStudent._id);
        console.log(this.state.existing_skills)
        setUserSkills(infoStudent._id, this.state.input_value);
        // this.setState({ existing_skills: this.state.input_value })
        // this.setState({ existing_skills: [...this.state.existing_skills, this.state.input_value] })
    }

    componentDidMount() {
        let paramsId = this.props.match.params.id;
        getSingleStudent(paramsId).then((response) => {
            this.setState({ infoStudent: response.data });

        });
    }

    render() {
        let { infoStudent } = this.state;
        // console.log(infoStudent);
        return (
            <Popup
                trigger={
                    <Button variant="primary" className="studentPageBtn">
                        Edit Skills
					</Button>
                }
                modal
                closeOnDocumentClick
            >
                <Form
                    className="popUpForm"
                    onSubmit={(event) => this.handleOnSubmit(event)}
                >
                    <div className="name">
                        Name: {infoStudent.first_name} {infoStudent.last_name}
                    </div>
                    <div className="house">House: {infoStudent.house}</div>

                    <Form.Group>
                        <Form.Label>Add Current skills</Form.Label>
                        <Form.Control
                            type="text"
                            name="existing_skills"
                            placeholder="Add Current skills"
                            onChange={(event) =>
                                this.setState({ input_value: event.target.value.toLowerCase() })
                            }
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="addStudentBtn borderBtn"
                    >
                        Submit
					</Button>
                </Form>
            </Popup>
        );
    }
}

export default withRouter(PopupOnFocus);
