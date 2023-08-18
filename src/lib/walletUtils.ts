import { error } from '@sveltejs/kit';

// how many to get per page // int or "" for all
let limit = ""; 

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
			const { data: walletsDataFromPage } = await getOnePage(walletAddress, currentPage);
	
			// if walletsDataFromPage is empty, then we have reached the end of the pages. stop the loop
			if (walletsDataFromPage.length === 0) {
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
	const res = await fetch(`https://xchain.io/api/balances/${walletAddress}/${currentPage}/${limit}`);
	return await res.json();
}

export function getAssetNameFromAsset(walletsDataFromPage: any, assetNamesAll: Array<String>) {
	return walletsDataFromPage.forEach((item) => {
		assetNamesAll.push(item.asset);
	});
}
