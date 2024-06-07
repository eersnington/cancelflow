import { db } from "@/lib/db";
import { planUpdateAction, subscriptionUpdateAction } from "@/lib/types";

export async function updateUserPlan({
    product_name, user_email, subscription_end_date }
    : planUpdateAction) {

    try {
        if (product_name === 'Cancelflow - Plus') {
            await db.user.update({
                where: {
                    email: user_email,
                },
                data: {
                    tier: "Plus",
                    formLimit: "50",
                    entryLimit: "Unlimited",
                    tierEndDate: subscription_end_date,
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
                    tierEndDate: subscription_end_date,
                },
            });
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateUserSubcription({ user_email, id, customer_id, product_id, variant_id, status }: subscriptionUpdateAction) {
    try {
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
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


export async function expireSubscription({ user_email }: { user_email: string }) {
    try {

        console.log("Email - ", user_email)

        await db.subscription.update({
            where: {
                userEmail: user_email,
            },
            data: {
                lemonSubscriptionStatus: "expired"
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
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
