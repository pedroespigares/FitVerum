import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /**
   * Variables para el registro
   */
  username :string = '';
  email :string = '';
  password :string = '';
  passwordCorrect :boolean = true;
  isEmpty :boolean = false;
  showingPassword :boolean = false;

  constructor(public auth: AuthService) { }

  /**
  * Comprobamos si el usuario está logueado
  */
  ngOnInit(){
    this.auth.checkAuthState();
  }

  /**
  * Comprobar si la contraseña cumple los requisitos
  */
  checkPassword(){
    let regularExpression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$");
    if(regularExpression.test(this.password)){
      this.passwordCorrect = true;
    }else{
      this.passwordCorrect = false;
    }
  }

  /**
  * Registrar con email y contraseña
  */
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

  /**
   * Registrar con Google
   */
  googleRegister(){
    this.auth.googleLogin();
  }


  /**
   * Evento para registrar con la tecla Enter
   */
  onKeyDown(event:any) {
    if (event.key === "Enter") {
      this.normalRegister();
    }
  }

  /**
   * Mostrar u ocultar la contraseña
   */
  showPassword(){
    this.showingPassword = !this.showingPassword;
  }

  /**
   * Registrar con Twitter
  */
  twitterLogin(){
    this.auth.twitterLogin();
  }

  /**
   * Limpiar los campos de texto
   * */
  ngOnDestroy(){
    this.auth.failedError = '';
    this.isEmpty = false;
    this.passwordCorrect = true;
  }
}
