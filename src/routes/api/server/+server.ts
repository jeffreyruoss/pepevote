import { error, json } from '@sveltejs/kit';
import pkg from 'bitcore-lib';
import { DIRECTUS_TOKEN, JWT_SECRET, ASSET1, ASSET2 } from "$env/static/private";
import jwt from 'jsonwebtoken';
import * as Sentry from "@sentry/sveltekit";

const { Message } = pkg;

interface Asset {
	asset: string
}

// how many to get per page // int or "" for all
let limit = ""; 

// Max pages just in case // int
let totalPages = 20;

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
	try {
		const { address, message, random } = await request.json();

		const verified = new Message(random).verify(address, message);

		if (!verified) {
			Sentry.captureException(`Address:${address} could not be validated`);
			throw error(400, `Address:${address} could not be validated`);
		}

		const collectedAssetNames = await collect(address);

		let containsAsset1 = false;
		let containsAsset2 = false;
		
		if (Array.isArray(collectedAssetNames)) {
				containsAsset1 = collectedAssetNames.includes(ASSET1);
				containsAsset2 = collectedAssetNames.includes(ASSET2);
		}		

		if (!containsAsset1 && !containsAsset2) {
			Sentry.captureException(`Wallet does not contain ${ASSET1} or ${ASSET2}`);
			throw error(401, `Wallet does not contain ${ASSET1} or ${ASSET2}`);
		}

		const assets = [ASSET1, ASSET2];

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

		if (!decoded.assets.includes(ASSET1) && !decoded.assets.includes(ASSET2)) {
			Sentry.captureException(`Wallet does not contain ${ASSET1} or ${ASSET2}`);
			throw error(401, `Wallet does not contain ${ASSET1} or ${ASSET2}`);
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

async function collect(walletAddress: string) {
	let currentPage = 1;
	const assetNamesAll: string[] = [];

  if (walletAddress === "") {
    return json({error: "Wallet address is required to search for assets and valid"});
  }

  while (currentPage < totalPages + 1) {
    const data = await getOnePage(walletAddress, currentPage);
    const alletsDataFromPage = data.data;

    // if alletsDataFromPage is empty, then we have reached the end of the pages. stop the loop
    if (alletsDataFromPage.length === 0) {
      break;
    }

    getAssetNameFromAsset(alletsDataFromPage, assetNamesAll);
		currentPage++;
  }

  return assetNamesAll;
}

async function getOnePage(walletAddress: string, currentPage: number) {
  const res = await fetch(`https://xchain.io/api/balances/${walletAddress}/${currentPage}/${limit}`);
  const pageData = await res.json();
  return pageData;
}

function getAssetNameFromAsset(alletsDataFromPage, assetNamesAll) {
  return alletsDataFromPage.forEach((item) => {
    assetNamesAll.push(item.asset);
  });
}
