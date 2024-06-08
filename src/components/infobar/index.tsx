'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from '../global/mode-toggle'
import { Book, Mail, Search } from 'lucide-react'
import Templates from '../icons/cloud_download'
import { Input } from '@/components/ui/input'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { UserButton } from '@clerk/nextjs'
import { useBilling } from '@/providers/billing-provider'
import { onPaymentDetails } from '@/app/(main)/(pages)/billing/_actions/payment-connecetions'

type Props = {}

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling()

  const onGetPayment = async () => {
    const response = await onPaymentDetails()
    if (response) {
      setTier(response.tier!)
      setCredits(response.formLimit!)
    }
  }

  useEffect(() => {
    onGetPayment()
  }, [])

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-black">Workflow Credits Remaining</p>
        {tier == 'Unlimited' ? (
          <span></span>
        ) : (
          <span>
            {credits}/{tier == 'Starter' ? '1' : tier == 'Plus' ? '50' : tier == 'Business' && 'Unlimited'}
          </span>
        )}
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <a href="mailto:sreeaadhi07@gmail.com?subject=Cancelflow%20-%20[Subject]&body=I%20need%20help%20with%20...">
              <Mail />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <a href="https://insigh.to/b/cancelflow" target="_blank">
              <Book />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Request a feature</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UserButton />
    </div>
  )
}

export default InfoBar
