import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackEndService} from '../back-end.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  myForm: FormGroup;
  userName: string;
  password: string;
  constructor(private backEnd: BackEndService, private http: HttpClient, private readonly router: Router) {
    if (backEnd.signedIn){
      this.router.navigate(['dashboard']);
    }
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.backEnd.signIn(this.userName, this.password).subscribe({
      next: res => {
        if (res) {
          this.backEnd.signedIn = true;
          this.backEnd.username = this.userName;
          this.backEnd.password = this.password;
          this.router.navigate(['dashboard']);
        }
      },
      error: err => {
      }
    });
  }
}
