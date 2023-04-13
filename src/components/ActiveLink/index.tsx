import { ReactNode, cloneElement } from 'react'
import Link, {LinkProps} from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
    children: ReactNode,
    activeClassName: string
}

export default function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps) {
    const {asPath} = useRouter()

    const className = asPath === rest.href ? activeClassName : ''
    
    return (
        <Link {...rest} className={className}>
            {children}
        </Link>
    )
} 