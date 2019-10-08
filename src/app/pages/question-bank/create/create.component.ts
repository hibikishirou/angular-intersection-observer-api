import { QuestionBankService } from './../question-bank.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class Question {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  right: string;
  constructor(question?) {
    question = question || {};
    this.question = question.question || '';
    this.a = question.a || '';
    this.b = question.b || '';
    this.c = question.c || '';
    this.d = question.d || '';
    this.right = question.right || '';
  }
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  question: Question = new Question();
  frm = new FormGroup({
    question: new FormControl('', Validators.required),
    a: new FormControl('', Validators.required),
    b: new FormControl('', Validators.required),
    c: new FormControl('', Validators.required),
    d: new FormControl('', Validators.required),
    right: new FormControl('', Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private questionBankService: QuestionBankService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }
  save() {
    let data = this.frm.getRawValue();
    this.questionBankService.saveQuestion(data).subscribe(result => {
      console.log(result);
    });
  }
}
