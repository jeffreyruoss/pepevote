import { error, json } from '@sveltejs/kit';
import pkg from 'bitcore-lib';
import { DIRECTUS_TOKEN, JWT_SECRET, ASSET } from "$env/static/private";
import jwt from 'jsonwebtoken';
import * as Sentry from "@sentry/sveltekit";

const { Message } = pkg;

interface Asset {
	asset: string
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	try {
		const { address, message, random } = await request.json();

		const verified = new Message(random).verify(address, message);

		if (!verified) {
			Sentry.captureException(`Address:${address} could not be validated`);
			throw error(400, `Address:${address} could not be validated`);
		}

		const response: any = await fetch(`https://xchain.io/api/balances/${address}`);
		const { data } = await response.json();
		const containsAsset = data.map((a: Asset) => a.asset).includes(ASSET);

		if (!containsAsset) {
			Sentry.captureException(`Address:${address} does not contain ${ASSET}`);
			throw error(401, `Address:${address} does not contain ${ASSET}`);
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
			Sentry.captureException(e.message);
			throw error(400, e.message);
		}
		Sentry.captureException(e.body.message);
		throw error(e.status, e.body.message);
	}

}

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
	try {
		const token: string | undefined = cookies.get('token');

		if (!token) {
			Sentry.captureException('No token located on request body');
			throw error(400, 'No token located on request body');
		}

		const decoded: any = jwt.verify(token, JWT_SECRET);

		if (!decoded.assets.includes(ASSET)) {
			Sentry.captureException(`Wallet does not contain ${ASSET}`);
			throw error(401, `Wallet does not contain ${ASSET}`);
		}

		return await fetch('https://data.rarepepes.com/items/candidates', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${DIRECTUS_TOKEN}`
			}
		})
	} catch (e: any) {
		if (e.message) {
			Sentry.captureException(e.message);
			throw error(400, e.message);
		}
		Sentry.captureException(e.body.message);
		throw error(e.status, e.body.message);
	}
}