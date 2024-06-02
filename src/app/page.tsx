import { HeroParallax } from '@/components/global/connect-parallax'
import { InfiniteMovingCards } from '@/components/global/infinite-moving-cards'
import Navbar from '@/components/global/navbar'
import HeroSection from '@/components/sections/hero-section'
import PricingPlan from '@/components/sections/pricing-plan'
import { clients, products } from '@/lib/constant'

export default function Home() {
  //WIP: remove fault IMAge for home page
  return (
    <main className="flex items-center justify-center flex-col">
      <Navbar />
      <HeroSection />
      <InfiniteMovingCards
        className="md:mt-[18rem] mt-[-100px]"
        items={clients}
        direction="right"
        speed="slow"
      />
      <section>
        <HeroParallax products={products}></HeroParallax>
      </section>
      <PricingPlan />
    </main>
  )
}
