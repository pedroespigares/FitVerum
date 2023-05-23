import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  canGetPhoto: boolean = false;
  language: string = localStorage.getItem('language');

  constructor(public auth: AuthService, public database: DatabaseService, public translate: TranslateService) {
    /**
     * Definimos los idiomas disponibles
     */
    translate.addLangs(['es', 'en']);
    if(this.language == null) {
      translate.use('en');
    } else {
      translate.use(this.language);
    }
  }

  /**
   * Comprobamos si el usuario está logueado
    * @returns void
   */
  ngOnInit(): void {
    this.auth.checkAuthState();
  }

  /**
   * Cerrar sesión
   * @returns void
   */
  logout() {
    this.auth.signOut();
  }

  /**
   * Cambiar el idioma de la aplicación
   * @param $event
   */
  changeLanguage($event: any) {
    this.translate.use($event.target.value);
    localStorage.setItem('language', $event.target.value);
  }
}
