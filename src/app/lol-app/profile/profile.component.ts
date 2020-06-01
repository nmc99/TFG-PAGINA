import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/scss/index.scss','./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthServicesService, private profileService: ProfileService) { }

  ngOnInit(): void {
    
  }

}
