import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProfileService } from '../../services/profile.service';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';
import { Router } from '@angular/router';
interface summonerV4 {
  accountId: String,
  name: String,
  profileIconId: Number,
  puuid: String,
  revisionDate: Number,
  summonerLevel: Number
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../../../../assets/scss/index.scss', './settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private profile: ProfileService, private authService: AuthServicesService, private route:Router) { }

  user = {
    serverSelected: '',
    summonerSearched: '',
  }
  summoner: summonerV4;

  ngOnInit(): void {
    $(".default-option").click(function () {
      $(".dropdown ul").toggleClass("active");
    });
    $(".dropdown ul .opc").click(function () {
      this.serverSelected = $(this).text();
      $(".default-option").text(this.serverSelected);
      $(".dropdown ul").removeClass("active");
    });

  }
  buscarSummoner() {
    this.user.serverSelected = document.getElementById('opc').innerHTML;
    this.profile.getSummonerV4(this.user.serverSelected, this.user.summonerSearched).subscribe(
      res => {
        if (res.status != undefined) {
          console.log("No se encontro al summoner")
        } else {
          this.summoner = res;
          console.log(res)
        }

      }
    )
  }

  save() {
    let summoners = { servidor: this.user.serverSelected, username: this.summoner.name }
    if (this.summoner != null) {
      this.authService.updateSummoners(summoners).subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/lol/profile/summoner'])
        }
      )
    }
  }
  close() {
    this.summoner = null;
  }

}
