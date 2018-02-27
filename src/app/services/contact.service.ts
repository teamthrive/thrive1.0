// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// @Injectable()
// export class FinancialService {

//   private messageSource = new BehaviorSubject("default message");
//   currentMessage = this.messageSource.asObservable();

//   constructor() { }

//   changeMessage(message: string) {
//     this.messageSource.next(message)
//   }

// }


import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { contactSave } from "./contact-add/contact-add.module";

@Injectable()
export class ContactService {
  private contactsUrl = 'http://localhost:3000/';

  constructor (private http: Http) {}

  // post("/api/contacts")
  // createContact(newContact: Contact): Promise<void | Contact> {
  //   return this.http.post(this.contactsUrl, newContact)
  //     .toPromise()
  //     .then(response => response.json() as Contact)
  //     .catch((err) => {
  //     console.log(err);
  //     console.log("tried")
  //   });
  // }
  createContact() {
    console.log(contactSave);
  }
}