import { db } from "@/lib/db";
import crypto from "crypto";
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add LEMONSQUEEZY_WEBHOOK_SECRET from Lemon Squeezy Dashboard to your Environment Variables");
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
        const { status } = body.data.attributes;

        console.log(body);

        console.log("Event type -", eventType, status)

        if (eventType === "subscription_created") {
            const { user_email, product_name, customer_id, product_id, variant_id, first_subscription_item } = body.data.attributes;

            if (product_name === 'Cancelflow  - Plus') {
                await db.user.update({
                    where: {
                        email: user_email,
                    },
                    data: {
                        tier: "Plus",
                        formLimit: "50",
                        entryLimit: "Unlimited"
                    },
                });
            } else if (product_name === 'Cancelflow  - Business') {

                await db.user.update({
                    where: {
                        email: user_email,
                    },
                    data: {
                        tier: "Business",
                        formLimit: "Unlimited",
                        entryLimit: "Unlimited"
                    },
                });
            }

            await db.subscription.upsert({
                where: {
                    lemonCustomerId: customer_id
                },
                update: {
                    lemonSubscriptionStatus: status,
                    lemonProductId: product_id,
                    lemonVariantId: variant_id,
                    lemonSubscriptionId: first_subscription_item.subscription_id,
                },
                create: {
                    user: {
                        connect: {
                            email: user_email,
                        },
                    },
                    lemonCustomerId: customer_id,
                    lemonProductId: product_id,
                    lemonVariantId: variant_id,
                    lemonSubscriptionId: first_subscription_item.subscription_id,
                    lemonSubscriptionStatus: status,
                },

            });

            console.log("Subscription created -", user_email, status)

            return new NextResponse(`${user_email} - plan upgraded in Cancelflow`, {
                status: 200,
            })
        } else if (eventType === "subscription_updated") {

            const { user_email } = body.data.attributes;

            // Handle subscription updated
            console.log("Subscription updated -", user_email, status)
        } else if (eventType === "subscription_cancelled") {
            // Handle subscription deleted
            const { user_email } = body.data.attributes;

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