<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Lucky Baker/betModes',
	});
</script>

<script lang="ts">
	import { StoryGameTemplate, StoryLocale, type TemplateArgs, templateArgs } from 'components-storybook';
	import { stateBet } from 'state-shared';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { setupLuckyBakerStory } from './storySetup';

	setupLuckyBakerStory();
	setContext();

	const betModes = ['base', 'bonushunt', 'feature_spins', 'bonus_buy_100', 'bonus_buy_200'] as const;
</script>

{#snippet template(args: TemplateArgs<{ mode: (typeof betModes)[number] }>)}
	<StoryGameTemplate skipLoadingScreen={args.skipLoadingScreen} action={args.action}>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

{#each betModes as mode}
	<Story
		name={mode}
		args={templateArgs({
			skipLoadingScreen: true,
			data: { mode },
			action: async ({ mode: betMode }) => {
				stateBet.activeBetModeKey = betMode;
			},
		})}
		{template}
	/>
{/each}
