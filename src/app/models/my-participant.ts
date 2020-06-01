import { ParticipantStatsDto } from './participant-stats-dto';

export interface MyParticipant {
    participantId: number,
    summonerName: string,
    teamId: number,
    championId: number,
    championName: string,
    spell1Id: number,
    spell2Id: number,
    stats: ParticipantStatsDto
    participantLevel: number,
    kda: number,
    totalminions: number,
    minionspermin: number,
    totalDamage: number,
    item0: number,
    item1: number,
    item2: number,
    item3: number,
    item4: number,
    item5: number,
    item6: number
}