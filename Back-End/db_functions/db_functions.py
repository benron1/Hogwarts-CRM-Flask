from initialize_db import db
from bson import ObjectId
import datetime
import calendar
from static_info import student_fields


class DbFunctions:

    def add_student(self, student):
        student_id = db.students.insert(student)
        return str(student_id)

    def get_all_students(self):
        students = db.students.find({})
        student_list = []
        for student in students:
            student['_id'] = str(student['_id'])
            student_list.append(student)

        return student_list

    def get_single_student(self, student_id):
        student = db.students.find_one({'_id': ObjectId(student_id)})
        if student is None:
            return False
        else:
            student['_id'] = str(student['_id'])
            return student

    def delete_student(self, student_id):
        student = db.students.delete_one({'_id': ObjectId(student_id)})
        if student.acknowledged and student.deleted_count == 1:
            return True
        else:
            return False

    def get_students_who_have_skill(self, skill):
        students_with_skill = db.students.aggregate(
            [{'$match': {"existing_skills": skill}}, {"$count": "num_students"}])
        for i in students_with_skill:
            return i['num_students']
        return 0

    def get_students_who_want_skill(self, skill):
        students_with_want_skill = db.students.aggregate(
            [{'$match': {"desired_skills": skill}}, {"$count": "num_students"}])
        for i in students_with_want_skill:
            return i['num_students']
        return 0

    def get_student_by_date(self, date):
        student_by_date = db.students.aggregate([{'$match': {"create_date": date}}])
        students_created_on_date = []
        for student in student_by_date:
            student['_id'] = str(student['_id'])
            students_created_on_date.append(student)
        return students_created_on_date

    def get_students_by_month(self, month, year):
        num_days_in_month = calendar.monthrange(year, month)[1]
        start_date = str(datetime.date(year, month, 1))
        end_date = str(datetime.date(year, month, num_days_in_month))
        students_matching_search = db.students.aggregate([{'$match': {"create_date": {'$gte': start_date, '$lt': end_date}}}])
        students_created_in_month = []
        for student in students_matching_search:
            student['_id'] = str(student['_id'])
            students_created_in_month.append(student)
        return students_created_in_month

    def update_student(self, student_id, dict):
        print("studentid dict db")
        print(student_id)
        print(dict)
        current_skills = db.students
        for key in dict:
            key_is_valid = False
            print("student field-db")
            print(student_fields)
            for i in student_fields:
                print("i - db")
                print(i)
                if key == i:
                    key_is_valid = True
                if key_is_valid:
                    single_entry = {key: dict[key], "last_update_time": datetime.datetime.now().isoformat()}
                    print("single entry")
                    print(single_entry)
                    dict_to_update = {'$set': single_entry}
                    print("dict to update")
                    print(dict_to_update)
                    student = db.students.update_one({"_id": ObjectId(student_id)}, dict_to_update)
            if not key_is_valid:
                invalid_key = key
                raise ValueError("The field '{}' is invalid.".format(invalid_key))
        return self.get_single_student(student_id)
