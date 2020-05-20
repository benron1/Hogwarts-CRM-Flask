import json


class Student:

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def __init__(self, student_id, first_name, last_name, creation_time, last_updated_time, current_magic_skills, desired_magic_skills, course_interests):
        self.student_id = str(student_id)
        self.first_name = first_name
        self.last_name = last_name
        self.last_updated_time = str(last_updated_time)
        self.current_magic_skills = current_magic_skills
        self.desired_magic_skills = desired_magic_skills
        self.course_interests = course_interests
        self.creation_time = str(creation_time)
