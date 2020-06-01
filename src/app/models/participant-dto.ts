import { RuneDto } from './rune-dto';
import { ParticipantStatsDto } from './participant-stats-dto';
import { ParticipantTimelineDto } from './participant-timeline-dto';
import { MasteryDto } from './mastery-dto';

export interface ParticipantDto {
    participantId: number,
    championId: number,
    runes: Array<RuneDto>,
    stats: ParticipantStatsDto,
    teamId: number, // 100 . 200
    timeline: ParticipantTimelineDto,
    spell1Id: number,
    spell2Id: number,
    highestAchievedSeasonTier: string, // CHALLENGER, MASTER, DIAMOND, PLATINUM, GOLD, SILVER, BRONZE, UNRANKED
    masteries: Array<MasteryDto>
}
