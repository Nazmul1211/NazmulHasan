'use client';

import { useState, useEffect } from 'react';
import styles from './Typewriter.module.css';

export default function Typewriter({ words, delay = 100, pause = 2000 }: { words: string[], delay?: number, pause?: number }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const word = words[currentWordIndex];

            if (isDeleting) {
                setCurrentText(word.substring(0, currentText.length - 1));
            } else {
                setCurrentText(word.substring(0, currentText.length + 1));
            }

            if (!isDeleting && currentText === word) {
                setTimeout(() => setIsDeleting(true), pause);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? delay / 2 : delay);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, delay, pause]);

    return (
        <span>
            {currentText}
            <span className={styles.cursor}>|</span>
        </span>
    );
}
