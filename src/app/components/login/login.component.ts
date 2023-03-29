import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email :string = '';
  password :string = '';
  isEmpty :boolean = false;
  constructor(public auth: AuthService) { }

  ngOnInit(){
    this.auth.checkAuthState();
  }

  normalLogin(){
    if(this.email == '' || this.password == ''){
      this.isEmpty = true;
      return;
    }
    this.auth.normalLogin(this.email, this.password);
  }

  googleLogin(){
    this.auth.googleLogin();
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      this.normalLogin();
    }
  }

  // githubLogin(){
  //   this.auth.githubLogin();
  // }
}
