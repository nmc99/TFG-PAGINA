import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';
import { ProfileService } from '../../services/profile.service';
import { User } from 'src/app/models/user';
import { MatchDto } from 'src/app/models/match-dto';
import { AppSettingsService } from '../../services/app-settings.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

interface summonerV4 {
  accountId: String,
  name: String,
  profileIconId: Number,
  puuid: String,
  revisionDate: Number,
  summonerLevel: Number,
  id: number,
}
interface Result {
  KDA: string,
  KDAPercent: number,
  VisionMin: string,
  VisionKP: number,
  CSMin: number,
  DamageMin: number,
  DamagePercentTeam: number,
  Duracion: string,
  TipoPartida: number,
  Champion: string,
  summonerName: string,
  totalCS: number,
  lane: string,
  role: string,
  win: string,
  KillParticipation: number,
  KDAString: string,
  winBoolean: boolean,
  matchId: number,
  server: string,
  gamecreationDay: number,
  gamecreationHour: number,
  gamecreationMinute: number,
  gamecreationMonth: number,
  gamecreationYear: number,
  gameDate: number,
  gameMode: string,
}

interface matchV4 {
  matches: Array<MatchDto>,
  startIndex: number,
  endIndex: number,
  totalGames: number

}


@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['../../../../assets/scss/index.scss', './summoner.component.scss']
})


export class SummonerComponent implements OnInit {

  constructor(
    private authService: AuthServicesService,
    private profileService: ProfileService,
    private appSettings: AppSettingsService,
    private route: ActivatedRoute,
  ) { }

  loadingBoolean = true;
  summonerV4;
  matchV4;
  data;
  currentUser: User;
  user = {
    servidor: '',
    username: ''
  }
  currentSummoner: summonerV4;

  subs = [];
  matches: Array<MatchDto> = [];

  resultados: Array<Result> = [];
  leagueV4;

  champions;


  wins: number;
  losses: number;
  winrate: number;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(e => this.currentUser = e);

    this.authService.getCurrentUser().pipe(
      concatMap((user: User) => this.profileService.getSummonerV4(user.summoners[0].servidor, user.summoners[0].username))
    ).subscribe(
      res => {
        this.currentSummoner = res;
        this.profileService.getLeagueV4(this.currentUser.summoners[0].servidor, res.id).subscribe(
          p => {
            this.leagueV4 = p;
            this.leagueV4.forEach(element => {
              this.wins = element.wins;
              this.losses = element.losses;
              this.winrate = Math.round(element.wins / (element.wins + element.losses) * 100);
            });


          }
        )
      }
    );



    // RECOGEMOS LOS CAMPEONES DEL JSON
    this.profileService.getProfileHistory().subscribe(
      res => {
        this.loadingBoolean = false;
        console.log(res)
        let totalgames = 0;
        let totalkda = 0;
        res.forEach(m => {
          let result: Result = {
            KDA: '',
            KDAPercent: 0,
            VisionMin: '',
            VisionKP: 0,
            CSMin: 0,
            DamageMin: 0,
            DamagePercentTeam: 0,
            Duracion: '',
            TipoPartida: 0,
            Champion: '',
            summonerName: '',
            totalCS: 0,
            lane: '',
            role: '',
            win: '',
            KillParticipation: 0,
            KDAString: '',
            winBoolean: false,
            matchId: 0,
            server: '',
            gamecreationDay: 0,
            gamecreationHour: 0,
            gamecreationMinute: 0,
            gamecreationMonth: 0,
            gamecreationYear: 0,
            gameDate: 0,
            gameMode: '',
          };
          result.matchId = m.gameId;
          result.gameMode = m.gameMode;
          console.log(result.gameMode)
          // DURACION DE LA PARTIDA
          let minutes = Math.floor(m.gameDuration / 60);
          let seconds = m.gameDuration - minutes * 60;
          let timeDurationString = `${minutes}:${seconds}`;
          result.Duracion = timeDurationString;
          let you = {
            summonerName: '',
            participantId: 0,
            teamId: 0,
            championId: 0,
          };
          // ENCONTRAR AL SUMMONER
          m.participantIdentities.forEach(e => {
            if (this.currentSummoner.name === e.player.summonerName) {
              you.participantId = e.participantId;
              you.summonerName = e.player.summonerName;
            }
          }
          )
          m.participants.forEach(p => {
            if (p.participantId == you.participantId) {
              you.teamId = p.teamId;
              you.championId = p.championId;
            }
          })
          // CALCULAR KDA Y KILL PARTICIPATION
          let kda, kdavalue, visionScore, totalminions, minionspermin, totaldamage, mydamage, lane, role;
          let totalteamdamage = 0;

          let kills, assists, deaths;
          let totalKills = 0;
          m.participants.forEach(p => {  // RECORREMOS LOS PARTICIPANTES PARA COMPROBAR EL TEAM
            if (you.teamId == p.teamId) {
              totalKills = totalKills + p.stats.kills;
              totalteamdamage = totalteamdamage + p.stats.totalDamageDealtToChampions;
              m.teams.forEach(m => {
                if (m.teamId === you.teamId) {
                  result.win = m.win;
                  if (m.win == 'Win') {
                    result.winBoolean = true
                  } else {
                    result.winBoolean = false
                  }
                }
              })
            }
            if (p.participantId == you.participantId) {
              kills = p.stats.kills;
              assists = p.stats.assists;
              deaths = p.stats.deaths;
              visionScore = p.stats.visionScore;
              totalminions = p.stats.totalMinionsKilled;
              minionspermin = Math.round((totalminions / minutes) * 10) / 10;
              totaldamage = Math.round(p.stats.totalDamageDealtToChampions / minutes);
              mydamage = p.stats.totalDamageDealtToChampions;
              lane = p.timeline.lane;
              role = p.timeline.role;

            }
          })
          if (deaths == 0) {                  // IF PARA EVITAR ERRORES
            kda = kills + assists;
          } else {
            kda = Math.round(((kills + assists) / deaths) * 100) / 100;
          }
          let kdaString = `${kills} / ${deaths} / ${assists}`;
          let KP = Math.round(((kills + assists) / totalKills) * 100);
          let DMG = Math.round((mydamage / totalteamdamage) * 100);

          let champImage;
          this.appSettings.getJSON().subscribe(
            res => {
              for (let i in res.data) {
                if (you.championId == res.data[i].key) {
                  champImage = res.data[i].name;
                }
              }
              result.CSMin = minionspermin;
              result.Champion = champImage;
              result.DamageMin = totaldamage;
              result.DamagePercentTeam = DMG;
              result.Duracion = timeDurationString;
              result.KillParticipation = KP;
              result.VisionKP = visionScore;
              result.summonerName = you.summonerName;
              result.KDAString = kdaString;
              result.KDA = kda;
              result.totalCS = totalminions;
              result.lane = lane;  // MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM
              result.role = role; //DUO,NONE,SOLO,DUO_CARRY,DUO_SUPPORT
              result.server = this.currentUser.summoners[0].servidor;


              let time = new Date(m.gameCreation);
              let day = time.getDate();
              let month = time.getMonth();
              let year = time.getFullYear();

              result.gamecreationDay = day;
              result.gamecreationMonth = month;
              result.gamecreationYear = year;

              this.resultados.push(result)
            }
          )


        })
      }
    )


  }



}
