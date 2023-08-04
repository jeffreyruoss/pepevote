import { error, json } from '@sveltejs/kit';
import pkg from 'bitcore-lib';
import { DIRECTUS_TOKEN } from "$env/static/private";

const { Message } = pkg;
const ASSET = 'NEWLORDKEK';

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

		const directus = await fetch('https://data.rarepepes.com/items/results', {
			method: 'POST',
			body: JSON.stringify({ "voter_wallet_id": address, "candidate_id": vote }) ,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${DIRECTUS_TOKEN}`
			}
		})
		console.log(directus)

	} catch (e: any) {
		// This is to accommodate the errors passed from the message verification
		if (e.message) {
			throw error(400, e.message);
		}
		throw error(e.status, e.body.message);
	}

    return new Response()
}