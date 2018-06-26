import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(private userService: UserService,
              private router: Router,
              private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  login(){
    this.loading = true;
    this.userService.loginUser(this.model.username, this.model.password)
      .subscribe(data => {
        this.loading = false;
        this._flashMessagesService.show('Login Successfull!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.router.navigateByUrl('/login');
        this._flashMessagesService.show('Login Failed!', { cssClass: 'alert-danger' });
    });
  }

}
