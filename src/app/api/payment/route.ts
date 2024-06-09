export const maxDuration = 20; // This function can run for a maximum of 5 seconds

import { NextResponse, NextRequest } from 'next/server'
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

import { listProducts } from '@lemonsqueezy/lemonsqueezy.js';

export async function GET(req: NextRequest) {

  const lsApiKey = process.env.LEMONSQUEEZY_API_KEY;
  const lsStoreId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!lsApiKey) {
    throw new Error('Please add LEMONSQUEEZY_API_KEY to your environment variables');
  }

  if (!lsStoreId) {
    throw new Error('Please add LEMONSQUEEZY_STORE_ID to your environment variables');
  }

  lemonSqueezySetup({
    apiKey: lsApiKey,
    onError(error) {
      console.log(error);
    },
  });

  const { statusCode, error, data } = await listProducts({ filter: { storeId: lsStoreId } });

  if (error) {
    return new NextResponse(`Error in fetching products...`, {
      status: 500,
    })
  }


  const freeTier = {
    type: "products",
    id: "123456",
    attributes: {
      name: "Cancelflow - Basic",
      buy_now_url: "https://cancelflow.lemonsqueezy.com",
    },
  }

  // @ts-ignore
  data.data.unshift(freeTier);

  [data.data[1], data.data[2]] = [data.data[2], data.data[1]];

  return NextResponse.json(data.data)
}
