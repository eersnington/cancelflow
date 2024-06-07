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

    console.log('✅ LemonSqueezy Webhook verified!')

    try {
        // Catch the event type
        // console.log(body);
        console.log("🍋 Event type -", eventType)

        if (eventType === "subscription_created") {
            const { id } = body.data;
            const { status, user_email, renews_at, product_name, customer_id, product_id, variant_id } = body.data.attributes;

            const endDate = new Date(renews_at);

            // update tier limits in User table

            if (product_name === 'Cancelflow - Plus') {
                await db.user.update({
                    where: {
                        email: user_email,
                    },
                    data: {
                        tier: "Plus",
                        formLimit: "50",
                        entryLimit: "Unlimited",
                        tierEndDate: endDate,
                    },
                });
            } else if (product_name === 'Cancelflow - Business') {

                await db.user.update({
                    where: {
                        email: user_email,
                    },
                    data: {
                        tier: "Business",
                        formLimit: "Unlimited",
                        entryLimit: "Unlimited",
                        tierEndDate: endDate,
                    },
                });
            }

            // Create subscription in Subscription table

            await db.subscription.upsert({
                where: {
                    userEmail: user_email
                },
                update: {
                    lemonCustomerId: customer_id,
                    lemonProductId: product_id,
                    lemonVariantId: variant_id,
                    lemonSubscriptionId: Number(id),
                    lemonSubscriptionStatus: status,
                },
                create: {
                    user: {
                        connect: {
                            email: user_email,
                        },
                    },
                    userEmail: user_email,
                    lemonCustomerId: customer_id,
                    lemonProductId: product_id,
                    lemonVariantId: variant_id,
                    lemonSubscriptionId: Number(id),
                    lemonSubscriptionStatus: status,
                },
            });

            console.log("✅ Subscription created -", user_email)

            return new NextResponse(`Subscription plan created for ${user_email}!`, {
                status: 200,
            })

        } else if (eventType === "subscription_updated") {

            const { id } = body.data;
            const { user_email, status, renews_at, customer_id, product_id, variant_id } = body.data.attributes;
            const endDate = new Date(renews_at);

            const user = await db.user.findUnique({
                where: {
                    email: user_email,
                },
            });
            if (!user) {
                return new NextResponse(`User not found - ${user_email}`, {
                    status: 404,
                })
            }
            // update subscription data in Subscription table

            await db.subscription.update({
                where: {
                    userEmail: user_email,
                },
                data: {
                    lemonCustomerId: customer_id,
                    lemonProductId: product_id,
                    lemonVariantId: variant_id,
                    lemonSubscriptionId: Number(id),
                    lemonSubscriptionStatus: status,
                },
            });

            console.log("✅ Subscription updated -", user_email)

            return new NextResponse(`Subscription plan updated for ${user_email}!`, {
                status: 200,
            })

        } else if (eventType === "subscription_renewed") {

        } else if (eventType === "subscription_cancelled") {
            // Handle subscription deleted
            const { user_email } = body.data.attributes;

            const user = await db.user.findUnique({
                where: {
                    email: user_email,
                },
            });

            if (!user) {
                return new NextResponse(`User not found - ${user_email}`, {
                    status: 404,
                })
            }

            const subscription_end_date = user.tierEndDate;

            await db.subscription.update({
                where: {
                    userEmail: user_email,
                },
                data: {
                    lemonSubscriptionStatus: "cancelled",
                },
            });

            console.log("Subscription cancelled -", user_email)

            return new NextResponse(`Subscription plan cancelled for ${user_email}! Access retained till ${subscription_end_date}`, {
                status: 200,
            })
        } else if (eventType === "subscription_expired") {
            const { user_email } = body.data.attributes;

            const user = await db.user.findUnique({
                where: {
                    email: user_email,
                },
            });

            if (!user) {
                return new NextResponse(`User not found - ${user_email}`, {
                    status: 404,
                })
            }

            await db.subscription.delete({
                where: {
                    userEmail: user_email,
                }
            });

            await db.user.update({
                where: {
                    email: user_email,
                },
                data: {
                    tier: "Starter",
                    formLimit: "1",
                    entryLimit: "50",
                    tierEndDate: new Date(Date.now()),
                },
            });

            console.log("Subscription expired -", user_email)

            return new NextResponse(`Subscription plan expired for ${user_email}!`, {
                status: 200,
            })
        }

    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }

    return new NextResponse('Webhook received', {
        status: 200,
    })
}