import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {Popup} from 'ng2-opd-popup';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  note: any = {};
  afdeling: Afdelingen[];
  allnotes : [{
       title: string,
       discription : string
   }];
  constructor(private popup:Popup,
              private userService: UserService,
              private _flashMessagesService: FlashMessagesService,
              private router: Router
              ) { }

  ngOnInit() {
    this.loadLists();
  }
  public loadLists():[]{
   this.userService.getAllnotes().subscribe(
       response => {
         this.allnotes = response._body;
         console.log("all notes value is",response)
       }
    );
   }
  //function to show the pop up form//
  shownoteform(){
    this.popup.options = {
            cancleBtnClass: "btn btn-default",
            confirmBtnClass: "btn btn-mbe-attack",
            color: "#A0DE4F",
            header: "Add Note",
            widthProsentage:50,
            animation: "bounceInDown",
            confirmBtnContent: "Add"}
    this.popup.show(this.popup.options);
  }
  //function get called when we click add button//
  addnote(){
      this.userService.addNote(this.note).subscribe(
          data => {
            this._flashMessagesService.show(' Note Added Successfull!', { cssClass: 'alert-success', timeout: 3000 });
            this.popup.hide();
            //this.router.navigate(['/dashboard']);
          },
          error => {
            this._flashMessagesService.grayOut(true);
            this._flashMessagesService.show("Some error occured", { cssClass: 'alert-danger' });
          }
       );
  }
}
