import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../../interfaces/student.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  studentsList!: Student[];

  @Output() openEditModal: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private studentsService: StudentsService) {
    this.studentsService.studentsListSubject.subscribe((res) => {
      this.studentsList = [...res];
    });
  }

  ngOnInit(): void {
    this.studentsList = this.studentsService.students;
  }

  // click functions
  onAddClicked() {
    this.studentsService.editedStudent =
      this.studentsService.emptyNewStudent();
    this.openEditModal.emit();
  }

  onEditClicked(editedStudent: Student) {
    this.studentsService.editedStudent = editedStudent;
    this.openEditModal.emit();
  }
}
