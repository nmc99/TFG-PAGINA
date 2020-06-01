import { ParticipantIdentityDto } from './participant-identity-dto';
import { TeamStatsDto } from './team-stats-dto';
import { ParticipantDto } from './participant-dto';

export interface MatchDto {
    gameId:number,
    participantIdentities:Array<ParticipantIdentityDto>,
    queueId:number, // DOCUMENTACION DE RIOT
    gameType:string, // DOCUMENTACION DE RIOT
    gameDuration:number, // DURACION DE LA PARTIDA EN SEGUNDOS
    teams:Array<TeamStatsDto>,
    platformId:string,
    gameCreation:number,
    seasonId:number, // DOCUMENTACION DE RIOT
    gameVersion:any, // PARCHE
    mapId:number, // DOCUMENTACION DE RIOT
    gameMode:string, // DOCUMENTACION DE RIOT
    participants:Array<ParticipantDto>
}   
