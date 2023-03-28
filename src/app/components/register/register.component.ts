import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username :string = '';
  email :string = '';
  password :string = '';
  constructor(public auth: AuthService) { }

  ngOnInit(){
    this.auth.checkAuthState();
  }

  async normalRegister(){
    this.auth.register(this.email, this.password, this.username);
  }

  googleRegister(){
    this.auth.googleLogin();
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      this.normalRegister();
    }
  }

  // githubRegister(){
  //   this.auth.githubLogin();
  // }
}
