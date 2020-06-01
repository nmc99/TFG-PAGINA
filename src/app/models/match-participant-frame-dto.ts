import { MatchPositionDto } from './match-position-dto';

export interface MatchParticipantFrameDto{
    participantId: number,
    minionsKilled:number,
    teamScore:number,
    dominionScore:number,
    totalGold:number,
    level:number,
    xp:number,
    currentGold:number,
    position:MatchPositionDto,
    jungleMinionsKilled:number,
}