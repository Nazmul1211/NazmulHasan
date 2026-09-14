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
    download?: boolean | string;
}

export default function Button({
    children,
    href,
    variant = 'primary',
    onClick,
    className = '',
    target,
    rel,
    download,
}: ButtonProps) {
    const classNames = `${styles.button} ${styles[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classNames} target={target} rel={rel} download={download}>
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
