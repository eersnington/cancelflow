'use client'
import React from 'react'

type Props = {
  onPayment(id: string): void
  products: any[]
  tier: string
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
  console.log(products)

  if (tier === 'Starter') {
    tier = 'Cancelflow - Basic'
  } else if (tier === 'Plus') {
    tier = 'Cancelflow - Plus'
  } else if (tier === 'Business') {
    tier = 'Cancelflow - Business'
  }

  return (
    <section className="flex w-full justify-center md:flex-row flex-col gap-6">
      {products &&
        products.map((product: any) => (
          <Card
            className="p-3"
            key={product.id}
          >
            <CardHeader>
              <CardTitle>{product.attributes.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <CardDescription>
                {product.attributes.name === 'Cancelflow - Business'
                  ? 'Unlock unlimited workflows and user submissions with advanced features like customizable workflows, automated actions, and comprehensive analytics.'
                  : product.attributes.name === 'Cancelflow - Plus'
                    ? 'Scale up with up to 50 workflows, unlimited user submissions, and access to all features including customizable workflows, automated actions, and analytics.'
                    : product.attributes.name === 'Cancelflow - Basic' &&
                    'Get started with 1 workflow and up to 50 user submissions, including customizable workflows, automated actions, and an analytics dashboard.'}
              </CardDescription>
              <div className="flex justify-between">
                <p className='font-bold'>
                  {product.attributes.name == 'Cancelflow - Basic'
                    ? '1'
                    : product.attributes.name == 'Cancelflow - Plus'
                      ? '50'
                      : product.attributes.name == 'Cancelflow - Business' && 'unlimited'}{' '}
                  <span className='font-normal'>{"workflow credit(s)"}</span>
                </p>
                <p className="font-bold">
                  {product.attributes.name == 'Cancelflow - Basic'
                    ? 'Free'
                    : product.attributes.name == 'Cancelflow - Plus'
                      ? <p className=' text-black dark:text-white font-bold'><span className='line-through text-gray-500 dark:text-gray-300'>{"24 "}</span> 18 /mo</p>
                      : product.attributes.name == 'Cancelflow - Business' && <p className=' text-black dark:text-white font-bold'><span className='line-through text-gray-500 dark:text-gray-300'>{"36 "}</span> 27 /mo</p>}{' '}
                </p>
              </div>
              {product.attributes.name == tier ? (
                <Button
                  disabled
                  variant="outline"
                >
                  Active
                </Button>
              ) : (
                <Button
                  onClick={() => onPayment(product.attributes.buy_now_url)}
                  variant="outline"
                >
                  Purchase
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
    </section>
  )
}
