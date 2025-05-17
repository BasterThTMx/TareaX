import { SubjectDTO } from "./subject.interface";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subjects: SubjectDTO;
}

export interface StudentDTO {
  id: string;
}
