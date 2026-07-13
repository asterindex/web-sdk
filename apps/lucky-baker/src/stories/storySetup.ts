import { stateBet, stateMeta } from 'state-shared';

import { LUCKY_BAKER_BET_MODE_META } from '../game/betModeMeta';

export function setupLuckyBakerStory() {
	stateMeta.betModeMeta = LUCKY_BAKER_BET_MODE_META;
	stateBet.activeBetModeKey = 'base';
}
