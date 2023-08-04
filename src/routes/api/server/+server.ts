import { error, json } from '@sveltejs/kit';
import pkg from 'bitcore-lib';
const { Message } = pkg;
const ASSET = 'LLAMAS';

interface Asset {
	asset: string
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { address, message, random, vote } = await request.json();

		const verified = new Message(random).verify(address, message);

		if (!verified) {
			throw error(400, 'Wallet could not be validated');
		}

		const response = await fetch(`https://xchain.io/api/balances/${address}`);
		const { data } = await response.json();
		const containsAsset = data.map((a: Asset) => a.asset).includes(ASSET);

		if (!containsAsset) {
			throw error(400, `Wallet does not contain ${ASSET}`);
		}
		// Make post to Directus
	} catch (e: any) {
		throw error(e.status, e.body.message);
	}

    return new Response()
}