import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { collect, getOnePage } from './walletUtils';
import { server } from '../mocks/server.js'
const GOOD_ADDRESS =  '14GRxZmNCLHo5Uknr2XYnGA61Hh9uMULXV';
const BAD_ADDRESS = 'this_should_not_work'

interface Assets {
	address: string,
	data: [],
	total: number
}

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('test collect function', () => {
	it('should return error if empty string', async () => {
		const assets:any = await collect(BAD_ADDRESS)
		console.log(assets)
		expect(assets).toBeTypeOf('object');
		expect(assets.status).toBe(400);
		expect(assets.body.message).toBe('Asset not found');
	});
	it('should return error if empty string', async () => {
		const assets = await collect(GOOD_ADDRESS)
		expect(assets).toBeTypeOf('object');
	});
});
