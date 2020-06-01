import { MatchParticipantFrameDto } from './match-participant-frame-dto';
import { MatchEventDto } from './match-event-dto';

export interface MatchFrameDto {
    participantFrames: Map<string, MatchParticipantFrameDto>,
    events: MatchEventDto[],
    timestamp: number,
}