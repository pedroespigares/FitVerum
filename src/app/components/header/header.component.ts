import { Component, onInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements onInit {
  canGetPhoto: boolean = false;
  
  constructor(public auth: AuthService, public database: DatabaseService) {}

  ngOnInit(): void {
    this.auth.checkAuthState();
  }

  logout() {
    this.auth.signOut();
  }
}
