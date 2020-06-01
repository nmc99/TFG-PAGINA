import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthServicesService } from '../auth/services/auth-services.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

interface summoner {
  username: string,
  servidor: string,
}
@Component({
  selector: 'app-lol',
  templateUrl: './lol.component.html',
  styleUrls: [
    '../../assets/scss/index.scss',
    './lol.component.scss',
  ]
})

export class LolComponent implements OnInit {

  constructor(private authService: AuthServicesService, private router: Router) { }

  currentUser: User;
  summoner: summoner;
  configMasonry() {

  }

  configSidebar() {

    // Sidebar links
    $('.sidebar .sidebar-menu li a').on('click', function () {
      const $this = $(this);

      if ($this.parent().hasClass('open')) {
        $this
          .parent()
          .children('.dropdown-menu')
          .slideUp(200, () => {
            $this.parent().removeClass('open');
          });
      } else {
        $this
          .parent()
          .parent()
          .children('li.open')
          .children('.dropdown-menu')
          .slideUp(200);

        $this
          .parent()
          .parent()
          .children('li.open')
          .children('a')
          .removeClass('open');

        $this
          .parent()
          .parent()
          .children('li.open')
          .removeClass('open');

        $this
          .parent()
          .children('.dropdown-menu')
          .slideDown(200, () => {
            $this.parent().addClass('open');
          });
      }
    });

    // Sidebar Activity Class
    const sidebarLinks = $('.sidebar').find('.sidebar-link');

    sidebarLinks
      .each((index, el) => {
        $(el).removeClass('active');
      })
      .addClass('active');

    // ٍSidebar Toggle
    $('.sidebar-toggle').on('click', (e) => {
      $('.app').toggleClass('is-collapsed');
      e.preventDefault();
    });



  };


  configSearch() {
    $('.search-toggle').on('click', e => {
      $('.search-box, .search-input').toggleClass('active');
      $('.search-input input').focus();
      e.preventDefault();
    });
  }


  ngOnInit(): void {
    this.configSidebar();
    this.configSearch();
    this.authService.getCurrentUser().subscribe(
      res => {
        this.summoner = res.summoners[0];
      }
    )
  }

  cerrarSesion() {
    this.authService.logOut();
  }

}
