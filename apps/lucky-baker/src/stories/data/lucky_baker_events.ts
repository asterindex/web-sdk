/** Sample book events from math books_base.jsonl.zst */

export const luckyBakerEvents = {
	"reveal": {
		"index": 0,
		"type": "reveal",
		"board": [
			[
				{
					"name": "H1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				}
			],
			[
				{
					"name": "L4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L3"
				}
			],
			[
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				}
			],
			[
				{
					"name": "L1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				}
			],
			[
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L4"
				},
				{
					"name": "L1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L3"
				}
			],
			[
				{
					"name": "L1"
				},
				{
					"name": "L2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				}
			]
		],
		"paddingPositions": [
			97,
			8,
			32,
			15,
			63,
			97
		],
		"gameType": "basegame",
		"anticipation": [
			0,
			0,
			0,
			0,
			0,
			0
		]
	},
	"winInfo": {
		"index": 1,
		"type": "winInfo",
		"totalWin": 20,
		"wins": [
			{
				"symbol": "L1",
				"win": 20,
				"positions": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 2,
						"row": 4
					},
					{
						"reel": 3,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					},
					{
						"reel": 4,
						"row": 1
					},
					{
						"reel": 4,
						"row": 2
					},
					{
						"reel": 4,
						"row": 4
					}
				],
				"meta": {
					"globalMult": 1,
					"clusterMult": 1,
					"winWithoutMult": 20,
					"overlay": {
						"reel": 3,
						"row": 3
					}
				}
			}
		]
	},
	"tumbleBoard": {
		"index": 3,
		"type": "tumbleBoard",
		"newSymbols": [
			[
				{
					"name": "L3"
				},
				{
					"name": "H3"
				}
			],
			[],
			[
				{
					"name": "H4"
				}
			],
			[
				{
					"name": "L1"
				},
				{
					"name": "L4"
				}
			],
			[
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				}
			],
			[]
		],
		"explodingSymbols": [
			{
				"reel": 0,
				"row": 1
			},
			{
				"reel": 0,
				"row": 2
			},
			{
				"reel": 2,
				"row": 4
			},
			{
				"reel": 3,
				"row": 2
			},
			{
				"reel": 3,
				"row": 3
			},
			{
				"reel": 4,
				"row": 1
			},
			{
				"reel": 4,
				"row": 2
			},
			{
				"reel": 4,
				"row": 4
			}
		]
	},
	"wildSpawnInfo": {
		"index": 4,
		"type": "wildSpawnInfo",
		"wildInfo": [
			{
				"reel": 4,
				"row": 4,
				"multiplier": 1,
				"multType": "add"
			},
			{
				"reel": 4,
				"row": 1,
				"multiplier": 5,
				"multType": "add"
			}
		]
	},
	"updateGlobalMult": {
		"index": 5,
		"type": "updateGlobalMult",
		"globalMult": 7
	},
	"freeSpinTrigger": {
		"index": 2,
		"type": "freeSpinTrigger",
		"totalFs": 10,
		"positions": [
			{
				"reel": 0,
				"row": 2
			},
			{
				"reel": 1,
				"row": 4
			},
			{
				"reel": 2,
				"row": 5
			},
			{
				"reel": 3,
				"row": 5
			}
		]
	}
} as const;
