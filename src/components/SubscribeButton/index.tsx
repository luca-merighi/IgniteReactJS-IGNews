import {useRouter} from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJS } from '@/services/stripe-js'

import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string
}

export default function SubscribeButton({priceId}: SubscribeButtonProps) {
    const {data} = useSession()
    const router = useRouter()
    
    async function handleSubscribe() {
        if(!data) {
            signIn('github')
            return
        }

        if(data.activeSubscription) {
            router.push('/posts')
            return
        }

        try {
            const response = await api.post('/subscribe')
            const {sessionId} = response.data

            const stripe = await getStripeJS()

            await stripe?.redirectToCheckout({sessionId})
        } catch (err) {
            alert(err)
        }
    }

    return (
        <button 
        type="button"
        onClick={handleSubscribe}
        className={styles.subscribeButton}>
            Subscribe Now!
        </button>
    )
}