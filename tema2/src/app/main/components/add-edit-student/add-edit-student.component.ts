import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../utility/custom-validator';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.scss'],
})
export class AddEditStudentComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  studentEditForm!: FormGroup;

  constructor(private studentsService: StudentsService) {
    studentsService.editedStudentSubject.subscribe(() => {
      this.initializeForm();
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentEditForm = new FormGroup({
      lName: new FormControl(this.studentsService.editedStudent.lName, [
        Validators.required,
      ]),
      fName: new FormControl(this.studentsService.editedStudent.fName, [
        Validators.required,
      ]),
      age: new FormControl(this.studentsService.editedStudent.age, [
        Validators.required,
        CustomValidator.ageValidator,
      ]),
    });
  }

  onOk(): void {
    this.studentsService.editedStudent.lName = this.studentEditForm.value.lName;
    this.studentsService.editedStudent.fName = this.studentEditForm.value.fName;
    this.studentsService.editedStudent.age = this.studentEditForm.value.age;

    this.studentsService.updateOrCreate(this.studentsService.editedStudent);

    this.closeModal.emit(true);
  }

  onCancel(): void {
    this.closeModal.emit(true);
  }

  // getters
  get lName(): FormControl {
    return this.studentEditForm.get('lName') as FormControl;
  }
  get fName(): FormControl {
    return this.studentEditForm.get('fName') as FormControl;
  }
  get age(): FormControl {
    return this.studentEditForm.get('age') as FormControl;
  }
}
