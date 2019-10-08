import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getListQuestion() {
    return this.http.get(`${this.url}/questions`);
  }

  saveQuestion(data) {
    return this.http.post(`${this.url}/question`, data);
  }
}
