<script lang="ts" module>
	export type EmitterEventWildSpawn =
		| {
				type: 'wildSpawnAnimate';
				wildInfo: {
					reel: number;
					row: number;
					multiplier: number;
					multType: 'add' | 'mult';
				}[];
		  };
</script>

<script lang="ts">
	import { waitForResolve } from 'utils-shared/wait';

	import { getContext } from '../game/context';

	const context = getContext();

	context.eventEmitter.subscribeOnMount({
		wildSpawnAnimate: async ({ wildInfo }) => {
			context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_wild_explode' });

			const promises = wildInfo.map(async (info) => {
				const reelSymbol =
					context.stateGame.board[info.reel].reelState.symbols[info.row];
				reelSymbol.rawSymbol = {
					name: 'W',
					multiplier: info.multiplier,
				};
				reelSymbol.symbolState = 'land';
				await waitForResolve((resolve) => (reelSymbol.oncomplete = resolve));
				reelSymbol.symbolState = 'static';
			});

			await Promise.all(promises);
		},
	});
</script>
