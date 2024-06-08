import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

type Props = {
  credits: number
  tier: string
}

const CreditTracker = ({ credits, tier }: Props) => {
  console.log(credits, tier)
  return (
    <div className="p-6">
      <Card className="p-6">
        <CardContent className="flex flex-col gap-6">
          <CardTitle className="font-light">Credit Tracker</CardTitle>
          <Progress
            value={
              tier == 'Free'
                ? credits / 1 * 100
                : tier == 'Plus'
                  ? credits / 50 * 100
                  : 100
            }
            className="w-full"
          />
          <div className="flex justify-end">
            <p>
              {tier == 'Free'
                ? `${credits}/1`
                : tier == 'Plus'
                  ? `${credits}/50`
                  : `Unlimited/Unlimited`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreditTracker
