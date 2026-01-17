'use client';

import { NotificationPermissionBanner, NotificationProvider } from '@/components/notifications';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function Providers({ children }: Props) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
            <NotificationProvider>
                {children}
                <NotificationPermissionBanner />
            </NotificationProvider>
        </ThemeProvider>
    );
}
