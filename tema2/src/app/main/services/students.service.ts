import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student.interface';
import { Subject } from 'rxjs';

import studentsData from './students.json'

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private studentsList: Student[] = studentsData;
  studentsListSubject = new Subject<Student[]>();

  constructor() { }

  // getter
  get students(): Student[] {
    return this.studentsList;
  }

  // setter
  set students(newStudents: any) {
    this.studentsList = newStudents;
    this.studentsListSubject.next(newStudents);
  }

}
