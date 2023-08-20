import { error, json } from '@sveltejs/kit';
import { DIRECTUS_TOKEN, JWT_SECRET, ASSETS } from "$env/static/private";
import jwt from 'jsonwebtoken';
import * as Sentry from "@sentry/sveltekit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	try {
		const { votes } = await request.json();

		const token: string | undefined = cookies.get('token');

		if (!token) {
			Sentry.captureException('No token located on request body');
			throw error(400, 'No token located on request body');
		}

		const decoded: any = jwt.verify(token, JWT_SECRET);

		if (!decoded.assets.filter((asset: string) => ASSETS.includes(asset)).length) {
			Sentry.captureException(`Wallet does not contain asset`);
			throw error(401, `Wallet does not contain asset`);
		}

		await fetch('https://data.rarepepes.com/items/results', {
			method: 'POST',
			body: JSON.stringify({ "voter_wallet_id": decoded.address, "voter_response": JSON.stringify(votes) }),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${DIRECTUS_TOKEN}`
			}
		})
		return new Response();
	} catch(e: any) {
				// This is to accommodate the errors passed from the message verification
				if (e.message) {
					Sentry.captureException(e.message);
					throw error(400, e.message);
				}
				Sentry.captureException(e.body.message);
				throw error(e.status, e.body.message);
	}
}