import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(private userService: UserService,
              private router: Router,
              private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
  }
  register(){
    this.loading = true;
    this.userService.registerUser(this.model).subscribe(
        data => {
          this._flashMessagesService.show('Registration Successfull!', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        },
        error => {
          this._flashMessagesService.grayOut(true);
          this._flashMessagesService.show(error._body, { cssClass: 'alert-danger' });
          this.loading = false;
        }
    );
  }

}
