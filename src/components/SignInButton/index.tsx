import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import {signIn, signOut, useSession} from 'next-auth/react'

import styles from './styles.module.scss'

export default function SignInButton() {
    const {data} = useSession()

    return data ? (
        <button 
        type="button"
        className={styles.signInButton}>
            <FaGithub color="#04d361" />
            {data.user?.name}
            <FiX 
            onClick={() => signOut()}
            color="#737380" 
            className={styles.closeIcon} />
        </button>
    ) : (
        <button 
        type="button"
        onClick={() => signIn('github')}
        className={styles.signInButton}>
            <FaGithub color="#eba417" />
            Sign in with GitHub
        </button>
    )
}