import { error } from '@sveltejs/kit';

// how many to get per page // int or "" for all
let limit = 500; 

// Max pages just in case // int
let totalPages = 20;

/**
 * 
 * @param {string} walletAddress - Wallet
 * @returns {Array.<string>} Array of asset names in strings
 * 
*/

export async function collect(walletAddress: string) {
	let currentPage = 1;
	const assetNamesAll: string[] = [];

	try {
		if (!walletAddress) {
			throw error(401, 'Wallet address cannot be empty');
		}
	
		while (currentPage < totalPages + 1) {
			const { data: walletsDataFromPage, status } = await getOnePage(walletAddress, currentPage);
			if (status === 400) {
				throw error(400, 'Asset not found');
			}
			// if walletsDataFromPage is empty, then we have reached the end of the pages. stop the loop
			if (walletsDataFromPage && walletsDataFromPage.length === 0) {
				break;
			}
	
			getAssetNameFromAsset(walletsDataFromPage, assetNamesAll);
				currentPage++;
		}	
	} catch(error) {
		return error
	}
	return assetNamesAll;
}

export async function getOnePage(walletAddress: string, currentPage: number) {
	try {
		const res = await fetch(`https://xchain.io/api/balances/${walletAddress}/${currentPage}/${limit}`);
		if (res.statusText === "Asset not found") {
			throw error(400, res.statusText)
		}
		return await res.json();
	} catch(error) {

		return error;
	}

}

export function getAssetNameFromAsset(walletsDataFromPage: any, assetNamesAll: Array<String>) {
	if(!Array.isArray(walletsDataFromPage)) {
		throw error(401, 'walletsDataFromPage is not an array') 
	}
	return walletsDataFromPage.forEach((item) => {
		assetNamesAll.push(item.asset);
	});
}
