import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    serverUrl: string = 'http://localhost:64006';
    datas: any = [
        { title: "Question_1", answer: 'A' },
        { title: "Question2", answer: 'B' },
        { title: "Question3", answer: 'C' },
        { title: "Question4", answer: 'A' },
        { title: "Question5", answer: 'B' },
        { title: "Question6", answer: 'C' }

    ]
    constructor(private http: HttpClient) {
    }
    

    submitAction() {
        console.log('yc');
    }
    submitTest() {
        this.datas[0].answer = "YC";
    }
    AddQuestion() {
        var question = { title: "QuestionADDD", answer: 'C' };
        this.datas.push(question);
    }

    loadData() {
        this.http.get(`${this.serverUrl}/api/Questions`).subscribe((res) => {
            console.log(res);
        });
    }
}
