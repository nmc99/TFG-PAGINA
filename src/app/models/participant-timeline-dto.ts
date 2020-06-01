export interface ParticipantTimelineDto {
    participantId: number,
    csDiffPerDeltas: Map<string, number>, // DIFERENCIA CREEP SCORE CONTRA EL OPONENTE POR UN TIEMPO ESPECIFICO
    damageTakenPerMinDeltas: Map<string, number>,
    role: string, // VALORES LEGALES => DUO,NONE,SOLO,DUO_CARRY,DUO_SUPPORT
    xpPerMinDeltas: Map<string, number>,
    lane: string, // MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM
    creepsPerMinDeltas: Map<string, number>,
    goldPerMinDeltas: Map<string, number>,
}
