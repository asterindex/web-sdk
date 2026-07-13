import { API_AMOUNT_MULTIPLIER, BOOK_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { stateBet } from 'state-shared';

/** Local mock RGS when `?rgs_url=` is absent — uses real math books from /mock/books_base.json. */
const isLocalMock = () =>
	typeof window !== 'undefined' && !new URLSearchParams(window.location.search).get('rgs_url');

const json = (body: unknown) =>
	new Response(JSON.stringify(body), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});

const DEFAULT_BET_API = 1_000_000;
const START_BALANCE_DOLLARS = 1_000_000;

const betLevels = [
	100_000, 200_000, 500_000, 1_000_000, 2_000_000, 5_000_000, 10_000_000, 20_000_000, 50_000_000,
];

const jurisdiction = {
	socialCasino: false,
	disabledFullscreen: false,
	disabledTurbo: false,
	disabledSuperTurbo: false,
	disabledAutoplay: false,
	disabledSlamstop: false,
	disabledSpacebar: false,
	disabledBuyFeature: false,
	displayNetPosition: false,
	displayRTP: false,
	displaySessionTimer: false,
	minimumRoundDuration: 0,
};

type MockBook = {
	events: Record<string, unknown>[];
	payoutMultiplier: number;
};

let booksPromise: Promise<MockBook[]> | null = null;

const loadBooks = () => {
	if (!booksPromise) {
		booksPromise = fetch('/mock/books_base.json')
			.then((res) => {
				if (!res.ok) throw new Error(`Failed to load mock books: ${res.status}`);
				return res.json() as Promise<MockBook[]>;
			})
			.catch((err) => {
				console.error(err);
				booksPromise = null;
				return [] as MockBook[];
			});
	}
	return booksPromise;
};

const applyDefaultBet = () => {
	const defaultBet = DEFAULT_BET_API / API_AMOUNT_MULTIPLIER;
	stateBet.betAmount = defaultBet;
	stateBet.wageredBetAmount = defaultBet;
};

export function installDevLocalRgsFetch(): void {
	if (!isLocalMock()) return;

	let balance = START_BALANCE_DOLLARS * API_AMOUNT_MULTIPLIER;
	let spin = 0;

	const orig = window.fetch.bind(window);

	window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
		if (
			!url.includes('/wallet/authenticate') &&
			!url.includes('/wallet/play') &&
			!url.includes('/wallet/end-round') &&
			!url.includes('/bet/event')
		) {
			return orig(input, init);
		}

		if (url.includes('/wallet/authenticate')) {
			spin = 0;
			balance = START_BALANCE_DOLLARS * API_AMOUNT_MULTIPLIER;
			queueMicrotask(applyDefaultBet);
			return json({
				balance: { amount: balance, currency: 'USD' },
				config: {
					gameID: 'lucky_baker',
					minBet: betLevels[0],
					maxBet: betLevels[betLevels.length - 1],
					stepBet: 100_000,
					defaultBetLevel: DEFAULT_BET_API,
					betLevels,
					jurisdiction,
				},
			});
		}

		if (url.includes('/wallet/play')) {
			const body = init?.body ? JSON.parse(String(init.body)) : {};
			const amount = Number(body.amount) || DEFAULT_BET_API;
			spin += 1;

			const books = await loadBooks();
			const book = books.length ? books[(spin - 1) % books.length] : { events: [], payoutMultiplier: 0 };
			const payoutMultiplier = book.payoutMultiplier / BOOK_AMOUNT_MULTIPLIER;
			const payout = Math.round((amount * book.payoutMultiplier) / BOOK_AMOUNT_MULTIPLIER);
			balance = balance - amount + payout;

			return json({
				balance: { amount: balance, currency: 'USD' },
				round: {
					betID: spin,
					amount,
					payout,
					payoutMultiplier,
					active: false,
					mode: String(body.mode || 'base'),
					event: '0',
					state: book.events,
				},
			});
		}

		if (url.includes('/wallet/end-round')) {
			return json({
				balance: { amount: balance, currency: 'USD' },
			});
		}

		if (url.includes('/bet/event')) {
			return json({});
		}

		return orig(input, init);
	};
}
