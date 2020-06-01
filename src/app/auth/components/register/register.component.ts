import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  errors = [];

  constructor(private authService: AuthServicesService, private router: Router, private fb: FormBuilder) { }

  

  ngOnInit(): void {
    this.registerConfig();
  
  }

  

  registerConfig() {
    $('.form-gp input').on('focus', function () {
      $(this).parent('.form-gp').addClass('focused');
    });
    $('.form-gp input').on('focusout', function () {
      if ($(this).val().length === 0) {
        $(this).parent('.form-gp').removeClass('focused');
      }
    });
  };

  register() {
    this.errors = [];
    this.authService.registrarse(this.user).subscribe(
      (res) => {
        if (res.statusCode == 200) {
          console.log(res.statusCode + ': ' + res.message);
          this.router.navigate(['/auth/login']);
        } else {
          for (var err in res) {
            console.log(res[err].error);
            this.errors.push(res[err].error);
          }
        }
      },
      (err) => console.log(err)
    );
  }

  onSaveForm(){

  }

}
