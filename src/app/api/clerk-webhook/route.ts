export const maxDuration = 20; // This function can run for a maximum of 5 seconds

import { db } from '@/lib/db'
import { Webhook } from 'svix'
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to your Environment Variables')
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Error occured in verifying Clerk webhook');
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured with verifying webhook', {
      status: 400
    })
  }

  console.log('✅ ClerkAuth Webhook verified!')

  try {
    const { id, email_addresses, first_name, last_name, image_url } = payload?.data

    const email = email_addresses[0]?.email_address
    console.log('✅', payload)

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        firstname: first_name,
        lastname: last_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        firstname: first_name || '',
        lastname: last_name || '',
        profileImage: image_url || '',
      },
    })
    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}
