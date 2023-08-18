import { describe, it, expect, vi } from 'vitest';
import { collect } from './walletUtils';

describe('test collect function', () => {
	// it('should return error if empty string', async () => {
	// 	const assets: any= await collect('');
	// 	expect(assets).toBeTypeOf('object');
	// 	expect(assets.status).toBe(401);
	// 	expect(assets.body.message).toBe('Wallet address cannot be empty');
	// });

	it('should return error if empty string', async () => {
		vi.mock('./walletUtils.ts', async () => {
			const actual = await vi.importActual("./walletUtils.ts")
			return {
				...actual,
				getOnePage: vi.fn(),
			}
		  })
		const assets: any= await collect('14GRxZmNCLHo5Uknr2XYnGA61Hh9uMULXV');
		console.log(assets)
		// expect(assets).toBeTypeOf('object');
	});
});
