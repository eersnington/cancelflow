import { cancelSubscription, deleteSubscription, updateUserPlan, updateUserSubcription } from "@/actions/paymentActions";
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

            const subscription_end_date = new Date(renews_at);

            // update tier limits in User table
            const plan_updated = updateUserPlan({
                product_name,
                user_email,
                subscription_end_date
            });

            // Create subscription in Subscription table
            const subscription_updated = updateUserSubcription({
                user_email,
                id,
                customer_id,
                product_id,
                variant_id,
                status
            });

            if (!plan_updated || !subscription_updated) {
                return new NextResponse(`Error updating user tier and limits for ${user_email}`, {
                    status: 500,
                })
            }

            console.log("✅ Subscription created -", user_email)

            return new NextResponse(`Subscription plan created for ${user_email}!`, {
                status: 200,
            })
        } else if (eventType === "subscription_updated") {

            const { id } = body.data;
            const { user_email, status, product_name, renews_at, customer_id, product_id, variant_id } = body.data.attributes;
            const subscription_end_date = new Date(renews_at);

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

            // update tier limits in User table
            const plan_updated = updateUserPlan({
                product_name: product_name,
                user_email,
                subscription_end_date
            });

            if (!plan_updated) {
                return new NextResponse(`Error updating user tier and limits for ${user_email}`, {
                    status: 500,
                })
            }

            // update subscription data in Subscription table
            const subscription_updated = updateUserSubcription({
                user_email,
                id,
                customer_id,
                product_id,
                variant_id,
                status
            });

            if (!subscription_updated) {
                return new NextResponse(`Error updating subscription for ${user_email}`, {
                    status: 500,
                })
            }

            console.log("✅ Subscription updated -", user_email)

            return new NextResponse(`Subscription plan updated for ${user_email}!`, {
                status: 200,
            })

        } else if (eventType === "subscription_plan_changed") {
            // Update user tier and limits

            const { user_email, renews_at, product_name } = body.data.attributes;
            const subscription_end_date = new Date(renews_at);

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

            // update tier limits in User table
            const plan_updated = updateUserPlan({
                product_name,
                user_email,
                subscription_end_date
            });

            if (!plan_updated) {
                return new NextResponse(`Error updating user tier and limits for ${user_email}`, {
                    status: 500,
                })
            }

            return new NextResponse(`Subscription plan changed for ${user_email}!`, {
                status: 200,
            })
        } else if (eventType === "subscription_resumed") {

            const { id } = body.data;
            const { status, user_email, renews_at, product_name, customer_id, product_id, variant_id } = body.data.attributes;
            const subscription_end_date = new Date(renews_at);

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

            // update tier limits in User table
            const plan_updated = updateUserPlan({
                product_name,
                user_email,
                subscription_end_date
            });

            if (!plan_updated) {
                return new NextResponse(`Error updating user tier and limits for ${user_email}`, {
                    status: 500,
                })
            }

            // update subscription data in Subscription table
            const subscription_updated = updateUserSubcription({
                user_email,
                id,
                customer_id,
                product_id,
                variant_id,
                status
            });

            if (!subscription_updated) {
                return new NextResponse(`Error updating subscription for ${user_email}`, {
                    status: 500,
                })
            }

            console.log("✅ Subscription resumed -", user_email)

            return new NextResponse(`Subscription plan resumed for ${user_email}!`, {
                status: 200,
            })
        } else if (eventType === "subscription_cancelled") {
            // Handle subscription cancelled event
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

            const cancel_subscription = cancelSubscription(user_email);

            if (!cancel_subscription) {
                return new NextResponse(`Error cancelling subscription for ${user_email}`, {
                    status: 500,
                })
            }

            console.log("Subscription cancelled -", user_email)

            return new NextResponse(`Subscription plan cancelled for ${user_email}! Access retained till ${subscription_end_date}`, {
                status: 200,
            })
        } else if (eventType === "subscription_expired") {
            // Handle subscription expired event
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

            const delete_subscription = deleteSubscription(user_email);

            if (!delete_subscription) {
                return new NextResponse(`Error expiring subscription for ${user_email}`, {
                    status: 500,
                })
            }

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