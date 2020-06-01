import { MatchFrameDto } from './match-frame-dto';

export interface MatchTimelineDto{
    frames: MatchFrameDto[],
    frameInterval: number
}