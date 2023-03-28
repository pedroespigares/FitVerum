import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  canGetPhoto: boolean = false;
  
  constructor(public auth: AuthService, public database: DatabaseService) {
    $(document).on('click', '.header-nav-hamburger-lines', function () {
      $('.header-nav').toggleClass('open');
      $('body').toggleClass('fixed-position');
    });

    $(document).on('click', '.header-nav-link', function () {
      $('.header-nav').removeClass('open');
      $('body').removeClass('fixed-position');
    });

    $(document).on('click', '.header-nav-button-not-focus', function () {
      $('.header-nav').removeClass('open');
      $('body').removeClass('fixed-position');
    });

    $(document).on('click', '.header-nav-button-focus', function () {
      $('.header-nav').removeClass('open');
      $('body').removeClass('fixed-position');
    });

    $(document).on('click', '.fa-gear', function () {
      $('.header-nav').removeClass('open');
      $('body').removeClass('fixed-position');
    });

    $(document).on('click', '.fa-right-to-bracket', function () {
      $('.header-nav').removeClass('open');
      $('body').removeClass('fixed-position');
    });

    $(document).on('mouseover', '.fa-gear', function () {
      $('.fa-gear').removeClass('close-gear');
      $('.fa-gear').addClass('open-gear');
    });

    $(document).on('mouseout', '.fa-gear', function () {
      $('.fa-gear').removeClass('open-gear');
      $('.fa-gear').addClass('close-gear');
    });
  }

  ngOnInit(): void {
    this.auth.checkAuthState();
  }

  logout() {
    this.auth.signOut();
  }
}
