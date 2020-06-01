import { MatchPositionDto } from './match-position-dto';

export interface MatchEventDto {
    laneType: string,
    skillSlot: number,
    ascendedType: string,
    creatorId: number,
    afterId: number,
    eventType: string,
    type: string, // LEGAL VALUES: 
    /*CHAMPION_KILL, WARD_PLACED,WARD_KILL, BUILDING_KILL, ELITE_MONSTER_KILL, ITEM_PURCHASED,
    ITEM_SOLD,ITEM_DESTROYED,ITEM_UNDO,SKILL_LEVEL_UP, ASCENDED_EVENT,CAPTURE_POINT,
    PORO_KING_SUMMON
    */
    levelUpType: string,
    wardType: string,
    participantId: string,
    towerType: string,
    itemId: string,
    beforeId: string,
    pointCaptured: string,
    monsterType: string,
    teamId: number,
    position: MatchPositionDto,
    killerId: number,
    timestamp: number,
    assistingParticipantIds: number[],
    buildingType: string,
    victimId: number
}