import crypto from "crypto";
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add LEMON_SQUEEZY_WEBHOOK_SECRET from Lemon Squeezy Dashboard to your Environment Variables");
    }

    const clonedReq = req.clone();
    const headerPayload = headers();
    const eventType = headerPayload.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
    const digest = Buffer.from(
        hmac.update(await clonedReq.text()).digest("hex"),
        "utf8"
    );

    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
        console.error('Error occured in verifying Clerk webhook');
        return new Response('Error occured with verifying webhook', {
            status: 400
        })
    }

    try {
        // Catch the event type
        const { status, user_email } = body.data.attributes;

        console.log("Event type -", eventType,)

        if (eventType === "subscription_created") {

            console.log("Subscription created -", user_email, status)
        } else if (eventType === "subscription_updated") {
            // Handle subscription updated
            console.log("Subscription updated -", user_email, status)
        } else if (eventType === "subscription_cancelled") {
            // Handle subscription deleted
            console.log("Subscription cancelled -", user_email, status)
        }

    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }

    console.log('✅ LemonSqueezy Webhook verified!')

    return new NextResponse('Webhook received', {
        status: 200,
    })
}