import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  emailSent: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  constructor() {}
 

  

  sendEmail() {
    emailjs.sendForm("service_cj8elnr", "template_qpxqf8n", "#contact-form", "c2I8uIaHDDPg57Fj5").then(() => {
      this.emailSent = true;
    }).catch((error) => {
      this.error = true;
      this.errorMessage = error;
    });
  }
}
