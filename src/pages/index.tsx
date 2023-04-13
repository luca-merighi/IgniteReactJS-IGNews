import React from 'react'
import Head from 'next/head'
import {GetStaticProps} from 'next'
import { stripe } from '@/services/stripe'

import styles from './home.module.scss'

import SubscribeButton from '@/components/SubscribeButton'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
} 

export default function Home({product}: HomeProps) {
  return (
    <React.Fragment>
      <Head>
        <title>IGNews | Home</title>
      </Head>
      
      <main className={styles.home}>
        <section>
          <span>👋 Hey, welcome</span>
          <h1>News about <br />
          the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <figure>
          <img 
          src="/images/avatar.svg" 
          alt="Girl coding" />
        </figure>
      </main>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Mu0G4BZ7kyU68W7N4dgrh6Y')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount! / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 Hours
  }
} 