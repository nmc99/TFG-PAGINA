import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/lol-app/services/profile.service';
import { MatchDto } from 'src/app/models/match-dto';
import { MatchTimelineDto } from 'src/app/models/match-timeline-dto';
import { ParticipantStatsDto } from 'src/app/models/participant-stats-dto';
import { AppSettingsService } from 'src/app/lol-app/services/app-settings.service';
import { Chart } from 'chart.js';
import { MyParticipant } from 'src/app/models/my-participant';

interface teamglobaldata {
  globalKills: number,
  globalAssists: number,
  globalDeaths: number,
  turrets: number,
  inhibitors: number,
  barons: number,
  riftHeralds: number,
  dragons: number,
  globalGold: number
}
interface yourTimeLine {
  participantId: number,
  kills: any[],
  buildings: any[],
  wards: any[],
  teamId: number,
  events: any[],
  championName: string,
  win: boolean,
  kda: number,
  damageTaken: number,
  gold: number,
  damageDealt: number,
}





@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.component.html',
  styleUrls: ['../../../../../assets/scss/index.scss', './matchdetails.component.scss']
})

export class MatchdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private appSettings: AppSettingsService) { }

  servidor;
  gameId;

  match: MatchDto;
  matchTimeline: MatchTimelineDto;
  participantIdentities1: MyParticipant[] = [];
  participantIdentities2: MyParticipant[] = [];
  gameMode: string;
  gameMonth: string;
  gameDay: string;
  gameDuration: string;

  team1Data: teamglobaldata = {
    globalKills: 0,
    globalAssists: 0,
    globalDeaths: 0,
    turrets: 0,
    inhibitors: 0,
    barons: 0,
    riftHeralds: 0,
    dragons: 0,
    globalGold: 0
  }
  team2Data: teamglobaldata = {
    globalKills: 0,
    globalAssists: 0,
    globalDeaths: 0,
    turrets: 0,
    inhibitors: 0,
    barons: 0,
    riftHeralds: 0,
    dragons: 0,
    globalGold: 0
  }
  yourSummonerName: string;
  yourSummonerLevel: number;
  yourTimeline: yourTimeLine;
  yourSummonerProfileIcon: number;
  loading: boolean = true;

  yourTeamNombres: string[] = [];
  yourTeamTotalDamageDealt: number[] = [];
  yourTeamTotalDamageTaken: number[] = [];
  yourTeamVisionScore: number[] = [];
  yourTeamCrowdControl: number[] = [];
  datos = [];

  /* LOGROS */

  demolition: boolean = false;  // > 3
  kpgod: boolean = false;  // > KP
  duelistMaster: boolean = false;  // > 3
  solitaryAssasin: boolean = false; // > 5
  ccMaster: boolean = false; // > 30
  tripleKill: boolean = false;
  quadraKill: boolean = false;
  pentaKill: boolean = false;
  firstblood: boolean = false;
  filthyRich: boolean = false;
  kdaGod: boolean = false;
  damageKing: boolean = false;
  filthyTank: boolean = false; // > Damage Taken
  completist: boolean = false; // Jungle and kills in all lines
  visiongod: boolean = false; // Puntuacion de vision 1.5x largo del juego



  /* MEJORAS */

  controlwards: boolean = false;
  recurringDeaths: boolean = false;
  useyourwards: boolean = false;
  badpositioning: boolean = false;
  lowvisionscore: boolean = false; // Puntuacion de vision - largo del juego

  yourParticipant = {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      concatMap((param: ParamMap) => this.profileService.getMatchDetails(param.get('servidor'), param.get('id')))
    ).subscribe(
      res => {
        this.route.paramMap.subscribe(param => this.yourSummonerName = param.get('summonerName'));
        this.loading = false;
        console.log(res);
        this.match = res[0];
        this.matchTimeline = res[1];

        this.match.teams.forEach(t => {
          if (t.teamId == 100) {
            this.team1Data.barons = t.baronKills;
            this.team1Data.dragons = t.dragonKills;
            this.team1Data.riftHeralds = t.riftHeraldKills;
            this.team1Data.inhibitors = t.inhibitorKills;
            this.team1Data.turrets = t.towerKills;
          } else {
            this.team2Data.barons = t.baronKills;
            this.team2Data.dragons = t.dragonKills;
            this.team2Data.riftHeralds = t.riftHeraldKills;
            this.team2Data.inhibitors = t.inhibitorKills;
            this.team2Data.turrets = t.towerKills;
          }
        });

        this.gameMode = this.match.gameMode;
        this.gameMonth = new Date(this.match.gameCreation).toString();


        let yourTimeLine: yourTimeLine = { // GUARDA LOS EVENTOS DE TU SUMMONER
          participantId: 0,
          kills: [],
          buildings: [],
          wards: [],
          teamId: 0,
          events: [],
          championName: '',
          win: false,
          kda: 0,
          damageTaken: 0,
          gold: 0,
          damageDealt: 0,
        }

        // DURACION DE LA PARTIDA
        let minutes = Math.floor(this.match.gameDuration / 60);
        let seconds = this.match.gameDuration - minutes * 60;
        let timeDurationString = `${minutes}:${seconds}`;
        this.gameDuration = timeDurationString;

        let team1Kills = 0, team1Assists = 0, team1Deaths = 0, team1totalGold = 0;
        let team2Kills = 0, team2Assists = 0, team2Deaths = 0, team2totalGold = 0;

        let kdarecord = 0;
        let kprecord = 0;
        let damagerecord = 0;
        let goldrecord = 0;
        let damagedealtrecord = 0;
        for (let i = 0; i < this.match.participantIdentities.length; i++) {
          let participant: MyParticipant = {
            participantId: 0,
            summonerName: '',
            teamId: 0,
            championId: 0,
            championName: '',
            spell1Id: 0,
            spell2Id: 0,
            stats: null,
            participantLevel: 0,
            kda: 0,
            totalminions: 0,
            minionspermin: 0,
            totalDamage: 0,
            item0: 0,
            item1: 0,
            item2: 0,
            item3: 0,
            item4: 0,
            item5: 0,
            item6: 0,
          };

          participant.summonerName = this.match.participantIdentities[i].player.summonerName;
          participant.stats = this.match.participants[i].stats; // GUARDA TODOS LOS STATS DEL PARTICIPANTE

          if (participant.summonerName == this.yourSummonerName) {
            yourTimeLine.participantId = participant.participantId;
            yourTimeLine.teamId = participant.teamId;
            this.yourSummonerProfileIcon = this.match.participantIdentities[i].player.profileIcon;
            this.match.teams.forEach(t => {
              if (t.win === "Win" && t.teamId === yourTimeLine.teamId) {
                yourTimeLine.win = true;
              }
            })
          };
        }

        for (let i = 0; i < this.match.participantIdentities.length; i++) {
          let participant: MyParticipant = {
            participantId: 0,
            summonerName: '',
            teamId: 0,
            championId: 0,
            championName: '',
            spell1Id: 0,
            spell2Id: 0,
            stats: null,
            participantLevel: 0,
            kda: 0,
            totalminions: 0,
            minionspermin: 0,
            totalDamage: 0,
            item0: 0,
            item1: 0,
            item2: 0,
            item3: 0,
            item4: 0,
            item5: 0,
            item6: 0,
          };


          participant.stats = this.match.participants[i].stats; // GUARDA TODOS LOS STATS DEL PARTICIPANTE

          participant.participantId = this.match.participantIdentities[i].participantId; // ID PARTICIPANTE
          participant.summonerName = this.match.participantIdentities[i].player.summonerName; // SUMMONER NAME
          participant.teamId = this.match.participants[i].teamId; // TEAM DEL PARTICIPANTE
          // SI ES TU SUMMONER
          if (participant.summonerName == this.yourSummonerName) {
            yourTimeLine.participantId = participant.participantId; // GUARDA TU ID
            yourTimeLine.teamId = participant.teamId; // GUARDA TU EQUIPO
            console.log(participant)
            if (participant.stats.quadraKills > 0) {
              this.quadraKill = true;
            }
            if (participant.stats.tripleKills > 0) {
              this.tripleKill = true;
            }
            if (participant.stats.pentaKills > 0) {
              this.pentaKill = true;
            }
            if (participant.stats.visionScore < minutes) {
              this.lowvisionscore = true;
            } else if (participant.stats.visionScore >= (minutes * 1.5)) {
              this.visiongod = true;
            }
            this.match.teams.forEach(t => {
              if (t.win === "Win" && t.teamId === yourTimeLine.teamId) {
                yourTimeLine.win = true;  // GUARDA EL RESULTADO DE LA PARTIDA
              }
            })
          };
          participant.championId = this.match.participants[i].championId; // ID DEL CAMPEON USADO
          participant.spell1Id = this.match.participants[i].spell1Id; // SPELL 1
          participant.spell2Id = this.match.participants[i].spell2Id; // SPELL 2
          participant.participantLevel = this.match.participants[i].stats.champLevel; // NIVEL DEL CAMPEON
          participant.totalminions = this.match.participants[i].stats.totalMinionsKilled; // TOTAL DE MINIONS 
          participant.minionspermin = Math.round((participant.totalminions / minutes) * 10) / 10; // MINIONS POR MINUTO
          participant.totalDamage = this.match.participants[i].stats.totalDamageDealt;  // DAÑO TOTAL
          participant.item0 = this.match.participants[i].stats.item0; // ITEMS
          participant.item1 = this.match.participants[i].stats.item1;
          participant.item2 = this.match.participants[i].stats.item2;
          participant.item3 = this.match.participants[i].stats.item3;
          participant.item4 = this.match.participants[i].stats.item4;
          participant.item5 = this.match.participants[i].stats.item5;
          participant.item6 = this.match.participants[i].stats.item6; // ACABA ITEMS

          // CALCULAR KDA 
          if (this.match.participants[i].stats.deaths == 0) {                  // IF PARA EVITAR ERRORES
            participant.kda = this.match.participants[i].stats.kills + this.match.participants[i].stats.assists;
            // COMPROBAR SI ES TEL KDA MAS ALTO
            if (participant.kda >= kdarecord) {
              kdarecord = participant.kda

            }
            if (participant.summonerName == this.yourSummonerName) {
              yourTimeLine.kda = participant.kda;
            }
          } else { // SI LAS MUERTES NO ES 0
            participant.kda = Math.round(((this.match.participants[i].stats.kills + this.match.participants[i].stats.assists) / this.match.participants[i].stats.deaths) * 100) / 100;
            if (participant.kda >= kdarecord) {
              kdarecord = participant.kda;
              // COMPROBAR SI ES TU KDA
            }
            if (participant.summonerName == this.yourSummonerName) {
              yourTimeLine.kda = participant.kda;
            }
          }
          // ASIGNAR NOMBRE DEL CAMPEON PARA MOSTRAR IMAGENES
          this.appSettings.getJSON().subscribe(
            res => {
              for (let i in res.data) {
                // SI ES TU SUMMONER
                if (participant.summonerName == this.yourSummonerName) {
                  if (participant.championId == res.data[i].key) {
                    yourTimeLine.championName = res.data[i].name;
                  }
                }
                if (participant.championId == res.data[i].key) {
                  participant.championName = res.data[i].name;
                }
              }
            }
          )

          if (participant.stats.totalDamageDealt >= damagedealtrecord) {
            damagedealtrecord = participant.stats.totalDamageDealt;
          }
          if (participant.summonerName == this.yourSummonerName) {
            yourTimeLine.damageDealt = participant.stats.totalDamageDealt;
          }
          if (participant.stats.totalDamageTaken >= damagerecord) {
            damagerecord = participant.stats.totalDamageTaken;
          }
          if (participant.summonerName == this.yourSummonerName) {
            yourTimeLine.damageTaken = participant.stats.totalDamageTaken;
          }
          if (participant.stats.goldEarned >= goldrecord) {
            goldrecord = participant.stats.goldEarned;
          }
          if (participant.summonerName == this.yourSummonerName) {
            yourTimeLine.gold = participant.stats.goldEarned;
          }

          if (participant.teamId == 100) {  // SI ES DEL TEAM BLUE AÑADIMOS AL ARRAY 1
            team1Kills = team1Kills + participant.stats.kills;  // KILLS GLOBALES
            team1Assists = team1Assists + participant.stats.assists;  // ASISTENCIAS GLOBALES
            team1Deaths = team1Deaths + participant.stats.deaths; // MUERTES GLOBALES
            team1totalGold = team1totalGold + participant.stats.goldEarned; // ORO GANADO GLOBAL
            this.participantIdentities1.push(participant);
          } else {
            team2Kills = team2Kills + participant.stats.kills;// KILLS GLOBALES
            team2Assists = team2Assists + participant.stats.assists;// ASISTENCIAS GLOBALES
            team2Deaths = team2Deaths + participant.stats.deaths;// MUERTES GLOBALES
            team2totalGold = team2totalGold + participant.stats.goldEarned;// ORO GANADO GLOBAL
            this.participantIdentities2.push(participant);

          }


        }

        // FOR PARA RECORRER
        for (let i = 0; i < this.match.participants.length; i++) {
          let p = this.match.participants[i];
          if (p.teamId == yourTimeLine.teamId) {
            this.yourTeamNombres.push(this.match.participantIdentities[i].player.summonerName);
            this.yourTeamTotalDamageDealt.push(p.stats.totalDamageDealt);
            this.yourTeamTotalDamageTaken.push(p.stats.totalDamageTaken);
            this.yourTeamVisionScore.push(p.stats.visionScore);
            this.yourTeamCrowdControl.push(p.stats.totalTimeCrowdControlDealt);
          }
        }

        // ASIGNAR DATOS GLOBALES DE CADA EQUIPO
        this.team1Data.globalGold = team1totalGold;
        this.team1Data.globalKills = team1Kills;
        this.team1Data.globalAssists = team1Assists;
        this.team1Data.globalDeaths = team1Deaths;
        this.team2Data.globalGold = team2totalGold;
        this.team2Data.globalKills = team2Kills;
        this.team2Data.globalAssists = team2Assists;
        this.team2Data.globalDeaths = team2Deaths;

        /*
        CHAMPION_KILL, WARD_PLACED,WARD_KILL, BUILDING_KILL, ELITE_MONSTER_KILL, ITEM_PURCHASED,
        ITEM_SOLD,ITEM_DESTROYED,ITEM_UNDO,SKILL_LEVEL_UP, ASCENDED_EVENT,CAPTURE_POINT,
        PORO_KING_SUMMON
        */
        let contadorFrames = 0;
        let controlward = 0;
        let contadorFramesMuertes = 0;
        let contadortorres = 0;
        let primeraMuerte = 0;
        this.matchTimeline.frames.forEach(f => {
          contadorFramesMuertes++;
          let contadormuertes = 0;
          if (f.events.length > 0) {
            f.events.forEach(e => {
              let id = Number.parseInt(e.participantId);
              if (
                e.type == "CHAMPION_KILL"
                && e.killerId == yourTimeLine.participantId
                && primeraMuerte <= 0) {
                this.firstblood = true;
                primeraMuerte = primeraMuerte + 1;
              }

              if (
                e.victimId == yourTimeLine.participantId ||
                e.killerId == yourTimeLine.participantId ||
                e.creatorId == yourTimeLine.participantId
              ) {
                let event = {};
                // ASESINATOS O MUERTES
                if (e.type == "CHAMPION_KILL") {
                  contadormuertes++;
                  let killer = e.killerId;
                  let killerName = '';
                  let victim = e.victimId;
                  let victimName = '';
                  let timestamp = new Date(e.timestamp).getMinutes();
                  let killerchamp = '';
                  let victimchamp = '';
                  if (contadormuertes > 1 && contadorFramesMuertes >= 2) {
                    this.recurringDeaths = true;
                    contadorFramesMuertes = 0;
                  }

                  this.match.participantIdentities.forEach(p => {
                    if (killer == p.participantId) {
                      killerName = p.player.summonerName;
                    };
                    if (victim == p.participantId) {
                      victimName = p.player.summonerName;
                    };
                  });
                  if (killer == yourTimeLine.participantId) {
                    event = { type: "kill", killerName: killerName, victimName: victimName, timestamp: timestamp };
                  } else {
                    event = { type: "death", killerName: killerName, victimName: victimName, timestamp: timestamp };

                  }
                }
                // WARDS PUESTOS
                if (e.type == "WARD_PLACED") {
                  let wardCreator = '';
                  let wardtype = '';
                  let timestamp = new Date(e.timestamp).getMinutes();
                  this.match.participantIdentities.forEach(p => {
                    if (p.participantId == yourTimeLine.participantId) {
                      wardCreator = p.player.summonerName;
                      switch (e.wardType) {
                        case "YELLOW_TRINKET":
                          wardtype = e.wardType;
                          if (contadorFrames >= 2) {
                            this.useyourwards = true;
                          }
                          break;
                        case "CONTROL_WARD":
                          controlward++;
                          wardtype = e.wardType;

                      }
                    }
                  })
                  event = { type: "ward", wardCreator: wardCreator, wardtype: wardtype, timestamp: timestamp };
                }
                // TORRES DESTRUIDAS
                if (e.type == "BUILDING_KILL") {
                  let timestamp = new Date(e.timestamp).getMinutes();
                  let buildingType = '';
                  let buildingKiller = '';
                  this.match.participantIdentities.forEach(p => {
                    if (p.participantId == yourTimeLine.participantId) {
                      let buildingKiller = p.player.summonerName;
                      switch (e.buildingType) {
                        case "INHIBITOR_BUILDING":
                          buildingType = "an inhibitor";
                          break;
                        case "TOWER_BUILDING":
                          buildingType = "a tower";
                          break;
                      }
                    }
                    event = { type: "building", buildingKiller: buildingKiller, buildingType: buildingType, timestamp: timestamp };
                  })
                  contadortorres++;
                }
                if (Object.entries(event).length != 0) {
                  yourTimeLine.events.push(event);
                }
              } else {
                contadorFrames = contadorFrames + 1;
              }

            })
          }
        })
        this.yourTimeline = yourTimeLine;
        if (controlward == 0) {
          this.controlwards = true;
        }
        if (kdarecord <= yourTimeLine.kda) {
          this.kdaGod = true;
        }
        if (damagerecord <= yourTimeLine.damageTaken) {
          this.filthyTank = true;
        }
        if (goldrecord <= yourTimeLine.gold) {
          this.filthyRich = true;
        }
        if (contadortorres >= 3) {
          this.demolition = true;
        }
        if (damagedealtrecord <= yourTimeLine.damageDealt) {
          this.damageKing = true;
        }
        var myChart = new Chart('canvas', {
          type: 'horizontalBar',
          data: {
            labels: this.yourTeamNombres,
            datasets: [
              {
                label: 'Total Damage Dealt',
                data: this.yourTeamTotalDamageDealt,
                backgroundColor: [
                  'rgb(73, 180, 255, 0.7)',
                  'rgb(73, 180, 255, 0.7)',
                  'rgb(73, 180, 255, 0.7)',
                  'rgb(73, 180, 255, 0.7)',
                  'rgb(73, 180, 255, 0.7)',
                  'rgb(73, 180, 255, 0.7)'
                ],

                borderWidth: 1,
                barThickness: 7,
              },
              {
                label: 'Total Damage Taken',
                data: this.yourTeamTotalDamageTaken,
                backgroundColor: [
                  'rgb(255, 79, 73, 0.7)',
                  'rgb(255, 79, 73, 0.7)',
                  'rgb(255, 79, 73, 0.7)',
                  'rgb(255, 79, 73, 0.7)',
                  'rgb(255, 79, 73, 0.7)',
                  'rgb(255, 79, 73, 0.7)',
                ],

                borderWidth: 1,
                barThickness: 7,
              },
              {
                label: 'Vision Score',
                data: this.yourTeamVisionScore,
                backgroundColor: [
                  'rgb(73, 255, 73, 0.7)',
                  'rgb(73, 255, 73, 0.7)',
                  'rgb(73, 255, 73, 0.7)',
                  'rgb(73, 255, 73, 0.7)',
                  'rgb(73, 255, 73, 0.7)',
                  'rgb(73, 255, 73, 0.7)'
                ],

                borderWidth: 1,
                barThickness: 7,
              },
              {
                label: 'Crowd Control Score',
                data: this.yourTeamCrowdControl,
                backgroundColor: [
                  'rgb(255, 180, 73, 0.7)',
                  'rgb(255, 180, 73, 0.7)',
                  'rgb(255, 180, 73, 0.7)',
                  'rgb(255, 180, 73, 0.7)',
                  'rgb(255, 180, 73, 0.7)',
                  'rgb(255, 180, 73, 0.7)',
                ],

                borderWidth: 1,
                barThickness: 7,
              },
            ]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontFamily: "'Poppins','Roboto', sans-serif"
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  fontFamily: "'Poppins','Roboto', sans-serif"
                }
              }]
            },
            labels: {
              fontFamily: "sans-serif,'Roboto', sans-serif"
            }
          }
        });
        console.log(this.participantIdentities1, this.team1Data, yourTimeLine.participantId, yourTimeLine.events)
      }
    )
  }

  calcularKda() {

  }

}
