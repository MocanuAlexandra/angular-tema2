import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student.interface';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import studentsData from './students.json';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private edited: Student = this.emptyNewStudent();
  editedStudentSubject = new Subject<Student>();

  private studentsList: Student[] = studentsData;
  studentsListSubject = new Subject<Student[]>();

  constructor() {}

  // getter
  get students(): Student[] {
    return this.studentsList;
  }
  get editedStudent(): Student {
    return this.edited;
  }

  // setter
  set students(newStudents: any) {
    this.studentsList = newStudents;
    this.studentsListSubject.next(newStudents);
  }
  set editedStudent(newStudent: Student) {
    this.edited = newStudent;
    this.editedStudentSubject.next(newStudent);
  }

  emptyNewStudent(): any {
    return {
      id: uuidv4(),
      lName: '',
      fName: '',
      age: 0,
    };
  }

  addNewStudent(newStudent: Student) {
    this.studentsList.push(newStudent);
    this.studentsListSubject.next(this.studentsList);
  }

  //main function used for adding/editing a student
  updateOrCreate(studentToBeUpdated: Student) {
    const existingStudent = this.studentsList.find(
      (student) => student.id === studentToBeUpdated.id
    );
    if (existingStudent !== undefined) {
      existingStudent.lName = studentToBeUpdated.lName;
      existingStudent.fName = studentToBeUpdated.fName;
      existingStudent.age = studentToBeUpdated.age;
      return;
    }

    this.addNewStudent(studentToBeUpdated);
  }
}
