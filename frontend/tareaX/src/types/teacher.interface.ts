import { StudentDTO } from "./student.interface";
import { SubjectDTO } from "./subject.interface";

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subjects: SubjectDTO;
  students: StudentDTO;
}

export interface TeacherDTO {
  id: string;
}
