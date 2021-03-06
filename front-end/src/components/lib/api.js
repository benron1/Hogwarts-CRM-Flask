import axios from "axios";


const baseUrl = 'http://127.0.0.1:5001';

//GET

export function getAllStudents() {
    return axios.get(`${baseUrl}/students`);
}

export function getSingleStudent(student_id) {
    return axios.get(`${baseUrl}/student/${student_id}`);
}

export function getStudentWithSkill(current_skills) {
    return axios.get(`${baseUrl}/students/${current_skills}`);
}

export function getStudentWhoWantSkill(skill) {
    return axios.get(`${baseUrl}/students/${skill}`);
}

export function getStudentByDate(date) {
    return axios.get(`${baseUrl}/students/${date}`);
}

//POST
export function addStudent(data) {
    console.log("data");
    console.log(data);
    axios.post(`${baseUrl}/student`, { data }).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
}

export async function setUserSkills(student_id, existing_skills) {
    console.log(existing_skills)
    await axios
        .post(`${baseUrl}/student/update_student/${student_id}`, { existing_skills })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
}

//DELETE

export async function deleteStudent(student_id) {
    console.log(student_id)
    await axios
        .delete(`${baseUrl}/student/${student_id}`)
        .then((response) => {
            console.log(response);
        });
}