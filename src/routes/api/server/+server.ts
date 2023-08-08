import { error, json } from '@sveltejs/kit';
import pkg from 'bitcore-lib';
import { DIRECTUS_TOKEN, JWT_SECRET } from "$env/static/private";
import jwt from 'jsonwebtoken';
import https from 'https';

const { Message } = pkg;
const ASSET = 'LLAMAS';

interface Asset {
	asset: string
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	try {
		const { address, message, random } = await request.json();

		const verified = new Message(random).verify(address, message);

		if (!verified) {
			throw error(400, 'Wallet could not be validated');
		}

		const response: any = await fetch(`https://xchain.io/api/balances/${address}`);
		const { data } = await response.json();
		const containsAsset = data.map((a: Asset) => a.asset).includes(ASSET);

		if (!containsAsset) {
			throw error(400, `Wallet does not contain ${ASSET}`);
		}

		const assets = data.map((asset: Asset) => asset.asset)

		const token = jwt.sign({ address, assets }, JWT_SECRET);

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 1000
		});

		return new Response()
	} catch (e: any) {
		// This is to accommodate the errors passed from the message verification
		if (e.message) {
			throw error(400, e.message);
		}
		throw error(e.status, e.body.message);
	}

}

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, request }) {
	try {
		const token: string | undefined = cookies.get('token');

		if (!token) {
			throw error(400, 'No token available');
		}

		const decoded = jwt.verify(token, JWT_SECRET);

		// if (decoded.assets.includes(ASSET))
		const response = await fetch('https://data.rarepepes.com/items/candidates', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${DIRECTUS_TOKEN}`
			}
		})
		const { data } = await response.json();
		return new Response(data)
	} catch (e: any) {
		if (e.message) {
			throw error(400, e.message);
		}
		throw error(e.status, e.body.message);
	}
}