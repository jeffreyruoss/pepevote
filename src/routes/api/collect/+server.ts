import { json } from '@sveltejs/kit';

// what page to start on
let page = 1; 

// how many to get per page // int or "" for all
let limit = ""; 

// Max pages just in case // int
let totalPages = 100;

let assetNamesAll = [];

let walletAddress;

export async function GET({url}) {
  walletAddress = url.searchParams.get('walletAddress');
  while (page < totalPages + 1) {
    const data = await getOnePage();
    const alletsDataFromPage = data.data;

    // if alletsDataFromPage is empty, then we have reached the end of the pages. stop the loop
    if (alletsDataFromPage.length === 0) {
      break;
    }

    getAssetNamesFromAsset(alletsDataFromPage);
  }
  page = 1; // set back to page one for next time
  console.log('assetNamesAll', assetNamesAll);
  console.log('assetNamesAll.length', assetNamesAll.length);
  return json(assetNamesAll);
}

async function getOnePage() {
  const res = await fetch(`https://xchain.io/api/balances/${walletAddress}/${page}/${limit}`);
  const pageData = await res.json();
  console.log("page", page);
  page++;
  return pageData;
}

function getAssetNamesFromAsset(asset) {
  return asset.forEach((item) => {
    assetNamesAll.push(item.asset);
  });
}