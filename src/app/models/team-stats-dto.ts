import { TeamBansDto } from './team-bans-dto';

export interface TeamStatsDto {
    towerKills: number,
    riftHeraldKills: number,
    firstBlood: Boolean,
    inhibitorKills: number,
    bans: Array<TeamBansDto>,
    firstBaron: Boolean,
    firstDragon: Boolean,
    dominionVictoryScore: number,
    dragonKills: number,
    baronKills: number,
    firstInhibitor: Boolean,
    firstTower: Boolean,
    vilemawKills: number,
    firstRiftHerald: Boolean,
    teamId: number, // 100 Blue Side . 200 Red Side
    win: string, // Fail, Win
}
