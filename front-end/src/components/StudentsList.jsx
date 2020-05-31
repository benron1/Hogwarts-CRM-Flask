import React from "react";
import { getAllStudents, deleteStudent, getSingleStudent } from "./lib/api";
import { AgGridReact } from "ag-grid-react";
import "../css/NewStudent.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../css/StudentsList.css";
import Popup from "reactjs-popup";
import PopupOnFocus from "./newStudent";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import AppContext from "../components/AppContext";
import NewStudent from "./StudentPage";


class StudentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acciStudent: false,
            idRoute: "",
            userId: "",
            columnDefs: [
                {
                    headerName: "",
                    field: "",
                    width: 50,
                    checkboxSelection: true,
                },

                {
                    headerName: "First name",
                    field: "first_name",
                    width: 120,
                    resizable: true,
                    sortable: true,
                },
                {
                    headerName: "Last name",
                    field: "last_name",
                    width: 120,
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "House",
                    field: "house",
                    width: 120,
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "Existing Skills",
                    field: "existing_skills",
                    width: 120,
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "Desired Skills",
                    field: "desired_skills",
                    width: 120,
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "Course Interests",
                    field: "course_interests",
                    width: 160,
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "Create Date",
                    field: "create_date",
                    width: 120,
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "Last Update",
                    field: "last_update_time",
                    sortable: true,
                    resizable: true,
                },
                {
                    headerName: "ID",
                    field: "_id",
                    sortable: true,
                    resizable: true,
                },
            ],
            rowData: [],
        };
    }

    async componentDidMount() {
        let data = await getAllStudents();
        console.log(data.data);
        let previousinfo = this.state.rowData;
        let newInfo = previousinfo.concat(data.data);
        this.setState({ rowData: newInfo });
    }

    onButtonClick = (e) => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        if (selectedData[0] !== undefined) {
            deleteStudent(selectedData[0]._id);
        }
    };

    onAccioClick = (event, callback) => {
        event.preventDefault();
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        if (selectedData[0] !== undefined) {
            this.setState({ acciStudent: true });
            this.setState({ userId: selectedData[0]._id })
            callback(selectedData[0]._id);
        }
    };

    render() {
        return (
            <div className="flexBox">
                <AppContext.Consumer>
                    {({ getID }) => (
                        <div className="flexBox">
                            <div>
                                <img
                                    src={
                                        "https://lh3.googleusercontent.com/proxy/9yo2hWZRAld5lQTj2jL_VSeKxwfOjOwWzDzZC-vv_P7I8lvsIJKC55mGGSMG-t7cOtEI9SL-v3gtWdL8UxaVwiRAHel_GKIyHQf4WUYElx2bzfWc4jPom7NkFl0I"
                                    }
                                    alt="goldenSnitch"
                                    className="goldenSnitch"
                                />
                            </div>
                            <div className="container">
                                <div className="ag-theme-alpine">
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.state.rowData}
                                        onGridReady={(params) => (this.gridApi = params.api)}
                                    ></AgGridReact>
                                    <div className="deleteText">
                                        Please select a user before clicking the button
									</div>
                                    <PopupOnFocus />
                                    <Button
                                        variant="primary"
                                        className="goTOpage borderBtn"
                                        onClick={(event) => this.onAccioClick(event, getID)}
                                    >
                                        {this.state.acciStudent === true && (
                                            <Redirect to={`/studentPage/${this.state.userId}`} />
                                        )}
                                        Accio Student
									</Button>
                                    <Button
                                        variant="primary"
                                        className="deleteBtn borderBtn"
                                        onClick={this.onButtonClick}
                                    >
                                        Avada Kedavra
									</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </AppContext.Consumer>
            </div>
        );
    }
}

export default StudentsList;
