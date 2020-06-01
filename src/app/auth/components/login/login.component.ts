import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServicesService, private router: Router) { }

  user = {
    email: '',
    password: '',
  };

  validateForm: FormGroup;

  loginConfig() {
    $('.form-gp input').on('focus', function () {
      $(this).parent('.form-gp').addClass('focused');
    });
    $('.form-gp input').on('focusout', function () {
      if ($(this).val().length === 0) {
        $(this).parent('.form-gp').removeClass('focused');
      }
    });
  }

  login() {
    this.authService.login(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.authService.getCurrentUser().subscribe(
          (res) => {
            localStorage.setItem('currentUser', JSON.stringify({ username: res.username, summoners: res.summoners, email: res.email }));
          }
        )
        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
  }



  ngOnInit(): void {
    this.loginConfig();
  }

}
