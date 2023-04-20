import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
studentsList!:Student[];

constructor(
  private studentsService: StudentsService
)
{
  this.studentsService.studentsListSubject.subscribe((res) => {
    this.studentsList = [...res];
  }); 
}

  ngOnInit(): void {
    this.studentsList = this.studentsService.students;
  }
}
