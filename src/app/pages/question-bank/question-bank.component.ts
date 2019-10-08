import { QuestionBankService } from './question-bank.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {
  questionList: any;

  constructor(private questionBankService: QuestionBankService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.questionBankService.getListQuestion().subscribe((data) => {
      console.log(data);
      this.questionList = data;
    });
  }
  createQuestion() {
    const dialogRef = this.dialog.open(CreateComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
   };
}
