import React from "react";
import { getStudentWithSkill, getStudentByDate } from "../lib/api";
import { Pie } from "react-chartjs-2";
import Calendar from "./Calender";
import "../css/Dashboard.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfStudent: "",
            selectedDate: "",
            chartData: {
                labels: [
                    "flying",
                    "Defense",
                    "Parseltongue",
                    "Astronomy",
                    "Charms",
                    "Herbs",
                    "History",
                    "Potions",
                    "Transfiguration",
                    "Runes",
                    "Divination",
                    "Muggle Knowledge",
                ],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            skillsSum: [],
        };
    }

    async componentDidMount() {
        let { labels } = this.state.chartData;
        // const [startDate, setStartDate] = useState(new Date());
        let countSkillArray = [];
        for (let i = 0; i < labels.length; i++) {
            let countSkill = await getStudentWithSkill(labels[i]);
            countSkillArray.push(countSkill.data);
        }
        let chart = this.state.chartData;
        chart.datasets[0].data = countSkillArray;
        this.setState({ chartData: chart });
        this.setCalander();
    }

    async setCalander(date) {
        console.log(date);
        if (date) {
            const dateToString =
                date.getFullYear() +
                "-" +
                0 +
                (date.getMonth() + 1) +
                "-" +
                0 +
                date.getDate();
            let numberOfStudent = await getStudentByDate(dateToString);
            console.log("numberOfStudent");
            console.log(numberOfStudent.data);
            this.setState({ numberOfStudent: numberOfStudent.data });
            this.setState({ selectedDate: dateToString });
        }
    }

    render() {
        return (
            <div className="flex listMarginTop">
                <div className="as">
                    dsfd
					<div>
                        <img
                            src={
                                "https://static.wixstatic.com/media/2ded8c_97dac7475d0e4adc87b78d66496a92cd~mv2.gif"
                            }
                            alt="HouseScore"
                            className="img-responsive"
                        />
                    </div>
                </div>
                <div className="flexColumn">
                    <div className="chart">
                        <Pie
                            data={this.state.chartData}
                            width={500}
                            // height={250}
                            options={{
                                title: {
                                    display: true,
                                    text: "Skills Chart",
                                    fontSize: 20,
                                    fontColor: "white",
                                },
                                legend: {
                                    display: true,
                                    position: "right",
                                },
                                // maintainAspectRatio: false,
                            }}
                        />
                    </div>
                    <div className="calendar">
                        {/* <div className="text-center"> */}
                        {this.state.numberOfStudent > 1 && (
                            <div className="text-center">
                                Number Of Student That Was Added
									<br /> At The {this.state.selectedDate} Is{" "}
                                <b>{this.state.numberOfStudent} students</b>
                            </div>
                        )}
                        {this.state.numberOfStudent <= 1 && (
                            <div className="text-center">
                                Number Of Student That Was Added
									<br /> At The {this.state.selectedDate} Is{" "}
                                <b>{this.state.numberOfStudent} student</b>
                            </div>
                        )}
                        {/* </div> */}

                        <div className="content-center flex">
                            <Calendar
                                handleDate={(date) => {
                                    this.setCalander(date);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
