import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'

export async function getUserCurrentPlan() {

    const user = await currentUser()

    if (user) {
        const connection = await db.user.findFirst({
            where: {
                clerkId: user.id,
            },
            select: {
                tier: true,
                formLimit: true,
            },
        })

        if (user) {
            return connection
        }
    }

}