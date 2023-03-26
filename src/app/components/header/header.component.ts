import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {
    $(document).on('click', '.header-nav-hamburger-lines', function () {
      $('.header-nav').toggleClass('open');
      $('body').toggleClass('fixed-position');
    });

    $(document).on('click', '.header-nav-link', function () {
      $('.header-nav').removeClass('open');
      $('body').removeClass('fixed-position');
    });
  }
}
