import { StudentDTO } from "./student.interface";
import { TeacherDTO } from "./teacher.interface";

export interface SubjectInfo {
  id: string;
  name: string;
  totalStudents: number;
  totalTeachers: number;
}

export interface SubjectDTO {
  id: string;
}

export interface Subject {
  id: string;
  name: string;
  teachers: string[];
  students: string[];
}
