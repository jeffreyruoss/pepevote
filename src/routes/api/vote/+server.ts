import { error, json } from '@sveltejs/kit';
import { DIRECTUS_TOKEN, JWT_SECRET } from "$env/static/private";
import jwt from 'jsonwebtoken';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	try {
		const { address, vote } = await request.json();

		const token: string | undefined = cookies.get('token');

		if (!token) {
			throw error(400, 'No token available');
		}

		const decoded = jwt.verify(token, JWT_SECRET);

		const directus = await fetch('https://data.rarepepes.com/items/results', {
			method: 'POST',
			body: JSON.stringify({ "voter_wallet_id": address, "candidate_id": vote }) ,
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
					throw error(400, e.message);
				}
				throw error(e.status, e.body.message);
	}
}