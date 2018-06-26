import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UserService {
  newuser: any = {};
  note: any = {};
  constructor(private http: Http) { }
  private serverApi= 'http://localhost:3000';
  //service for registration
  public registerUser(newuser){
     let URI = `${this.serverApi}/users/register`;
     let headers = new Headers;
     headers.append('Content-Type', 'application/json');
     return this.http.post(URI, newuser, {headers: headers});
  }
  //service for login the user
  public loginUser(username: string, password: string){
    let URI = `${this.serverApi}/users/authenticate`;
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, {username : username, password: password});
  }
  //service for save a note//
  public addNote(note){
      let URI = `${this.serverApi}/users/addnote`;
      let headers = new Headers;
      headers.append('Content-Type', 'application/json');
      return this.http.post(URI, note, {headers: headers});
  }
  //function to get all notes for a particular user//
  public getAllnotes(){
      let URI = `${this.serverApi}/users/getallnotes`;
      let headers = new Headers;
      headers.append('Content-Type', 'application/json');
      return this.http.post(URI, {headers: headers});
  }
}
