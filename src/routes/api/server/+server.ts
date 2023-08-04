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
		const { wallet, message, random } = await request.json();
		const verified = new Message(random).verify(wallet, message);

		if (!verified) {
			throw error(400, 'Wallet could not be validated');
		}

		const response = await fetch(`https://xchain.io/api/balances/${wallet}`);
		const { data } = await response.json();
		const containsAsset = data.map((a: Asset) => a.asset).includes(ASSET);

		if (!containsAsset) {
			throw error(400, `Wallet does not contain ${ASSET}`);
		}
	} catch (e) {
		console.log(e)
	}

    return new Response('HELLO')
}