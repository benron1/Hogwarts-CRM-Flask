import datetime
from static_methods import turn_string_to_list


class Student(dict):

    def __init__(self, student):
        self.existing_skills = turn_string_to_list(student.get("existing_skills"))
        self.desired_skills = turn_string_to_list(student.get('desired_skills'))
        self.course_interests = turn_string_to_list(student.get("course_interests"))

        dict.__init__(self,
                      first_name=student.get('first_name'),
                      last_name=student.get('last_name'),
                      create_date=datetime.date.today().isoformat(),
                      last_update_time=datetime.datetime.now().isoformat(),
                      house=student.get('house'),
                      existing_skills=self.existing_skills,
                      desired_skills=self.desired_skills,
                      course_interests=self.course_interests)
