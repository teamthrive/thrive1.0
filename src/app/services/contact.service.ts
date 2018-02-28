import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
  private contactsUrl = 'https://thrive-database-proxy.herokuapp.com/';

  constructor (private _http:HttpClient) {}

  createContact(newContact: Contact) {
    return this._http.post(this.contactsUrl, newContact)
    .subscribe(res => {
      console.log(res);
    }),
    err => {
      console.log("Error occured.");
    }
  };
}