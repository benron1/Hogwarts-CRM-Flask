from initialize_db import db
from bson import ObjectId


class DbFunctions:

    def add_student(self, student):
        student_id = db.students.insert_one(student)
        return student_id

    def get_all_students(self):
        students = db.students.find({})
        for i in students:
            print(i)
        return students

    def get_single_student(self, student_id):
        student = db.students.find_one({'_id': ObjectId(student_id)})
        return student

    def delete_student(self, student_id):
        student = db.students.delete_one({'_id': ObjectId(student_id)})
        if student.acknowledged and student.deleted_count == 1:
            return True
        else:
            return False

    def set_student_skills(self, new_skills, student_id):
        student = self.get_single_student(student_id)
        existing_skills = student['existing_skills']
        updated_skills = existing_skills + new_skills
        updated_skills = list(dict.fromkeys(updated_skills))
        updated = db.students.update({'_id': ObjectId(student_id)}, {'$set': {"existing_skills": updated_skills}})
        return updated

    def get_student_with_skill(self, skill):
        students_with_skill = db.students.aggregate([{'$match': {'existing_skills': skill}}, {'$count': "num_students"}])
        for i in students_with_skill:
            print(i["num_students"])

    def get_students_who_want_skill(self, skill):
        students_with_want_skill = db.students.aggregate(
            [{'$match': {"desired_skills": skill}}, {"$count": "num_students"}])
        for i in students_with_want_skill:
            return i['num_students']
        return 0

    def get_student_by_date(self, date):
        student_by_date = db.students.aggregate([{'$match': {"date": date}}, {'$count': "students_added_today"}])
        for i in student_by_date:
            return i['students_added_today']
        return 0


test = DbFunctions()
# for i in range(1,10):
#     test.add_student({"name": "Rachel" + str(i), "existing_skills": ["1", "2", "3"]})

# test.add_student({"name": "Harry", "occupation": "Wizard", "existing_skills": ["Parseltongue"]})
test.get_student_by_date("05/21/91")

# test.get_student_with_skill("Parseltongue")


