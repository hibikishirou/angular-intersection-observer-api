import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

interface QuestionBank {
  quest: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
}
@Component({
  selector: 'app-crawl-data',
  templateUrl: './crawl-data.component.html',
  styleUrls: ['./crawl-data.component.scss']
})
export class CrawlDataComponent implements OnInit {
  inputData: string;
  questionList: QuestionBank[] = [];
  answerList: string[] = [];

  constructor() { }

  ngOnInit() {
  }
  crawler(inputData?) {
    inputData = inputData || this.inputData;
    const dom = new DOMParser().parseFromString(inputData, 'text/html');
    const questListDOM = dom.getElementsByClassName('question');
    const answerListDOM = dom.getElementsByClassName('options');
    for (let i = 0; i < 50; i++) {
      const quest = questListDOM.item(i).innerHTML.split('<br>')[0];
      const answer = answerListDOM.item(i).getElementsByTagName('label');
      const answerA = answer.item(0).innerHTML.split('">')[1].split('<div')[0];
      const answerB = answer.item(1).innerHTML.split('">')[1].split('<div')[0];
      const answerC = answer.item(2).innerHTML.split('">')[1].split('<div')[0];
      const answerD = answer.item(3).innerHTML.split('">')[1].split('<div')[0];
      const questBank = {
        quest: '' + quest,
        answerA: answerA || '',
        answerB: answerB || '',
        answerC: answerC || '',
        answerD: answerD || '',
        rightAnswer: ''
      };
      this.questionList.push(questBank);
    }
  }
  answer(inputData?) {
    inputData = inputData || this.inputData;
    const dom = new DOMParser().parseFromString(inputData, 'text/html');
    const answerListDOM = dom.getElementsByClassName('options');
    for (let i = 0; i < 50; i++) {
      const answer = answerListDOM.item(i).getElementsByTagName('li');
      let rightAnswer = '';
      if (answer.item(0).className === 'green ') {
        rightAnswer = 'A';
      }
      if (answer.item(1).className === 'green ') {
        rightAnswer = 'B';
      }
      if (answer.item(2).className === 'green ') {
        rightAnswer = 'C';
      }
      if (answer.item(3).className === 'green ') {
        rightAnswer = 'D';
      }
      this.answerList.push(rightAnswer);
    }
  }
}
