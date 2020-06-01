import { Injectable, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatchDto } from 'src/app/models/match-dto';
import { Result } from 'src/app/models/result';
import { AppSettingsService } from './app-settings.service';

interface summonerV4 {
  accountId: String,
  name: String,
  profileIconId: Number,
  puuid: String,
  revisionDate: Number,
  summonerLevel: Number,
  status_code: number
}
interface matchV4 {
  matches: Array<MatchDto>,
  startIndex: Number,
  endIndex: Number,
  totalGames: Number

}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private authService: AuthServicesService, private http: HttpClient, private appSettings: AppSettingsService) { }

  private URL = "http://localhost:3000/summoner/";


  currentUser;

  getProfile(server: String, name: String) {
    return this.http.get<any[]>(this.URL + `getAllData/${server}/${name}`);
  }

  getMatchV4(server: String, accountId: String) {
    return this.http.get<matchV4>(this.URL + `getMatchs/${server}/${accountId}`);
  }

  getProfileHistory() {
    return this.http.get<MatchDto[]>(this.URL + 'getProfileHistory/');
  }

  getSummonerV4(servidor, name) {
    return this.http.get<any>(this.URL + `getSummoner/${servidor}/${name}`);
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      res => this.currentUser = res
    )
  }

  getLeagueV4(servidor, name) {
    return this.http.get<any>(this.URL + `/getLeagueV4/${servidor}/${name}`);
  }
  getAllData(servidor, name) {
    return this.http.get(this.URL + `getAllData/${servidor}/${name}`);
  }

  getMatchDetails(servidor, id) {
    return this.http.get(this.URL + `getMatchDetails/${servidor}/${id}`);
  }



}
