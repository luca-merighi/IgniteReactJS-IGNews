import ActiveLink from '../ActiveLink'
import SignInButton from '../SignInButton'

import styles from './styles.module.scss'

export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img 
                src="/images/logo.svg" 
                alt="Logo IGNews" />

                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        Home
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        Posts
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}