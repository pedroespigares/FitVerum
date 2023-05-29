import { Component, OnDestroy } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy{
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  emailSent: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  cannotSend: boolean = false;

  constructor() {}


  /**
   * Enviar email mediante emailjs
   */
  sendEmail() {
    let trimmedName = this.name.trim();
    let trimmedEmail = this.email.trim();
    let trimmedSubject = this.subject.trim();
    let trimmedMessage = this.message.trim();

    if(trimmedName == '' || trimmedEmail == '' || trimmedSubject == '' || trimmedMessage == ''){
      this.errorMessage = "Fields cannot be empty or just spaces";
      return;
    }

    let regularExpression = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    if(!regularExpression.test(this.email)){
      this.errorMessage = "Email is not valid";
      return;
    }
    emailjs.sendForm("service_cj8elnr", "template_qpxqf8n", "#contact-form", "c2I8uIaHDDPg57Fj5").then(() => {
      emailjs.sendForm("service_cj8elnr", "template_yh6fbpz", "#contact-form", "c2I8uIaHDDPg57Fj5").then(() =>{
        this.emailSent = true;
        this.cannotSend = true;
      }).catch((error) => {
        this.error = true;
        this.errorMessage = error;
      });
    }).catch((error) => {
      this.error = true;
      this.errorMessage = error;
    });
  }

  ngOnDestroy(): void {
    this.emailSent = false;
    this.error = false;
    this.errorMessage = '';
    this.cannotSend = false;
  }
}
