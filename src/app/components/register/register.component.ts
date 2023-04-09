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
  passwordCorrect :boolean = true;
  isEmpty :boolean = false;
  showingPassword :boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit(){
    this.auth.checkAuthState();
  }

  checkPassword(){
    let regularExpression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$");
    if(regularExpression.test(this.password)){
      this.passwordCorrect = true;
    }else{
      this.passwordCorrect = false;
    }
  }
  
  async normalRegister(){
    if(this.username == '' || this.email == '' || this.password == ''){
      this.isEmpty = true;
      return;
    }
    this.checkPassword();
    if(this.passwordCorrect){
      this.auth.register(this.email, this.password, this.username);
    }
  }

  googleRegister(){
    this.auth.googleLogin();
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      this.normalRegister();
    }
  }

  showPassword(){
    this.showingPassword = !this.showingPassword;
  }

  // githubRegister(){
  //   this.auth.githubLogin();
  // }

  ngOnDestroy(){
    this.auth.failedError = '';
    this.isEmpty = false;
    this.passwordCorrect = true;
  }
}
