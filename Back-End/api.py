from flask import Flask, request
from flask_cors import CORS
from student import Student
from db_functions import DbFunctions
from validator import Validators
import json

app = Flask(__name__)
CORS(app)
db = DbFunctions()
validator = Validators()


@app.route("/students")
def get_students_route():
    if request.args.get('skill'):
        skill = request.args.get('skill')
        students_with_skill = db.get_students_who_have_skill(skill)
        response = app.response_class(
            response=json.dumps({"Students with skill '{}'.".format(skill): students_with_skill}), status=200,
            mimetype="application/json")
        return response
    if request.args.get('desired_skill'):
        desired_skill = request.args.get('desired_skill')
        students_wanting_skill = db.get_students_who_want_skill(desired_skill)
        response = app.response_class(
            response=json.dumps(
                {"Students with want to have the '{}' skill.".format(desired_skill): students_wanting_skill}),
            status=200,
            mimetype="application/json")
        return response
    if request.args.get('date'):
        date = request.args.get('date')
        students_created_on_date = db.get_student_by_date(date)
        response = app.response_class(response=json.dumps(students_created_on_date), status=200,
                                      mimetype="application/json")
        return response
    if request.args.get('month'):
        month_and_year = request.args.get('month')
        for i in month_and_year:
            try:
                validator.validate_item_is_int(i)
            except Exception as error:
                print(error)
                response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                              mimetype="application/json")
                return response
        month_and_year = month_and_year.split("-")
        month = int(month_and_year[0])
        year = int(month_and_year[1])
        students_created_this_month = db.get_students_by_month(month, year)
        response = app.response_class(response=json.dumps(students_created_this_month), status=200,
                                      mimetype="application/json")
        return response
    else:
        all_students = db.get_all_students()
        response = app.response_class(response=json.dumps(all_students), status=200, mimetype="application/json")
        return response

@app.route("/students")
def get_students_by_skill_route():
    skill = request.args.get('skill')
    print(skill)

@app.route("/student", methods=['POST'])
def add_student_route():
    content = request.json['data']
    print(content)
    try:
        validator.validate_new_student(content)
    except Exception as error:
        print(error)
        response = app.response_class(response=json.dumps({"error": str(error)}), status=400,
                                      mimetype="application/json")
        return response
    new_student = Student(content)
    student_id = db.add_student(new_student)
    response = app.response_class(response=json.dumps({"student_id": student_id}), status=200,
                                  mimetype="application/json")
    return response

@app.route("/student/<student_id>", methods=['DELETE'])
def delete_student_route(student_id):
    try:
        validator.validate_objectid(student_id)
    except Exception as error:
         response = app.response_class(response=json.dumps({'Error': str(error)}), status=400,
                                      mimetype="application/json")
    deleted_student = db.delete_student(student_id)
    if not deleted_student:
        response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=404, mimetype="application/json")
    else:
        response_body = {"Status": "Student with id {} was successfully deleted.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=200, mimetype="application/json")
    return response

@app.route("/student/<student_id>")
def get_single_student_route(student_id):
    try:
        validator.validate_objectid(student_id)
    except Exception as error:
        response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                      mimetype="application/json")
        return response
    student = db.get_single_student(student_id)
    if not student:
        response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=404, mimetype="application/json")
    else:
        response = app.response_class(response=json.dumps(student), status=200, mimetype="application/json")
    return response

# @app.route("/student/update_student/<student_id>", methods=['POST'])
# def set_student_skills_route(student_id):
#     try:
#         validator.validate_objectid(student_id)
#     except Exception as error:
#         response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
#                                       mimetype="application/json")
#         return response
#     student = db.get_single_student(student_id)
#     if not student:
#         response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
#         response = app.response_class(response=json.dumps(response_body), status=404, mimetype="application/json")
#         return response
#     else:
#         updates_to_user = request.json
#         print('updates_to_user')
#         print(updates_to_user)
#         try:
#             updated_student = db.update_student(student_id, updates_to_user)
#             response = app.response_class(response=json.dumps(updated_student), status=200, mimetype="application/json")
#             return response
#         except Exception as error:
#             response = app.response_class(response=json.dumps({"Error": str(error)}), status=400, mimetype="application/json")
#             return response

@app.route("/student/update_student/<student_id>", methods=['POST'])
def set_student_skills_route(student_id):
    try:
        validator.validate_objectid(student_id)
    except Exception as error:
        response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                      mimetype="application/json")
        return response
    student = db.get_single_student(student_id)
    if not student:
        response_body = {"Error": "Id '{}' does not exist.".format(student_id)}
        response = app.response_class(response=json.dumps(response_body), status=404,
                                      mimetype="application/json")
        return response
    else:
        updates_to_user = request.json
        print("updates to user")
        print(updates_to_user)
        try:
            updated_student = db.update_student(student_id, updates_to_user)
            response = app.response_class(response=json.dumps(updated_student), status=200,
                                          mimetype="application/json")
            return response
        except Exception as error:
            response = app.response_class(response=json.dumps({"Error": str(error)}), status=400,
                                          mimetype="application/json")
            return response


if __name__ == '__main__':
    app.run(debug=True, port=5001)

