import React from 'react'
import Stripe from 'stripe'
import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'
import BillingDashboard from './_components/billing-dashboard'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

const Billing = async (props: Props) => {

  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress || '';

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Billing</span>
      </h1>
      <BillingDashboard email={email} />
    </div>
  )
}

export default Billing
