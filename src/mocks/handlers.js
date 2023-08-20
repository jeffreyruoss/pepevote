import { rest } from 'msw';
import data from './data.json'

export const handlers = [
	// Handle GET to XChain
	rest.get('https://xchain.io/api/balances/:walletAddress/:currentPage/:limit', (req, res, ctx) => {
		const { walletAddress, currentPage, limit } = req.params;
		if (data.address === walletAddress) {
			return res(ctx.json(data))
		} else {
			return res(
				ctx.status(200, 'Asset not found')
			)
		}
	})
]