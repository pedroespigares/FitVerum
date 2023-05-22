import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email :string = '';
  password :string = '';
  isEmpty :boolean = false;
  emailEmpty :boolean = false;
  showingPassword :boolean = false;
  constructor(public auth: AuthService) { }

  /*
  * Comprobamos si el usuario está logueado
  * @returns void
  * */

  ngOnInit(){
    this.auth.checkAuthState();
  }

  /*
  * Iniciar sesión con email y contraseña
  * @returns void
  * */

  normalLogin(){
    if(this.email == '' || this.password == ''){
      this.isEmpty = true;
      return;
    }
    this.auth.normalLogin(this.email, this.password);
  }

  /*
  * Iniciar sesión con Google
  * @returns void
  * */

  googleLogin(){
    this.auth.googleLogin();
  }

  twitterLogin(){
    this.auth.twitterLogin();
  }

  /*
  * Evento para iniciar sesión con la tecla Enter
  * */

  onKeyDown(event: any) {
    if (event.key === "Enter") {
      this.normalLogin();
    }
  }

  /*
  * Mostrar u ocultar la contraseña
  * */

  showPassword(){
    this.showingPassword = !this.showingPassword;
  }

  forgotPassword(){
    this.isEmpty = false;

    let regularExpression = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    if(this.email == '' || !regularExpression.test(this.email)){
      this.emailEmpty = true;
      return;
    }

    this.auth.sendPasswordResetEmail(this.email)
    this.emailEmpty = false;
    this.auth.failedError = '';
  }
  /*
  * Limpiar el error de inicio de sesión
  * */
  ngOnDestroy(){
    this.auth.failedError = '';
    this.isEmpty = false;
  }
}
