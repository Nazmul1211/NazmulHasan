import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    variant?: 'primary' | 'outline' | 'ghost';
    onClick?: () => void;
    className?: string;
    target?: string;
    rel?: string;
}

export default function Button({
    children,
    href,
    variant = 'primary',
    onClick,
    className = '',
    target,
    rel
}: ButtonProps) {
    const classNames = `${styles.button} ${styles[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classNames} target={target} rel={rel}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classNames} onClick={onClick}>
            {children}
        </button>
    );
}
