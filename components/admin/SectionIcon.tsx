'use client';

import * as Icons from 'lucide-react';

interface SectionIconProps {
    name: string;
    className?: string;
    size?: number;
}

export default function SectionIcon({ name, className = '', size = 20 }: SectionIconProps) {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) {
        return <Icons.HelpCircle className={className} size={size} />;
    }
    return <IconComponent className={className} size={size} />;
}
