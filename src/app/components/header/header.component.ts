import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  canGetPhoto: boolean = false;

  constructor(public auth: AuthService, public database: DatabaseService) {}

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
}
