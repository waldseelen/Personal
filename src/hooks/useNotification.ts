'use client';

import { useCallback, useEffect, useState } from 'react';

export type NotificationPermission = 'default' | 'granted' | 'denied';

interface NotificationOptions {
    title: string;
    body?: string;
    icon?: string;
    tag?: string;
    requireInteraction?: boolean;
    onClick?: () => void;
}

interface UseNotificationReturn {
    permission: NotificationPermission;
    isSupported: boolean;
    requestPermission: () => Promise<NotificationPermission>;
    sendNotification: (options: NotificationOptions) => Notification | null;
}

/**
 * Hook for browser notification management
 * Provides permission handling and notification sending capabilities
 */
export function useNotification(): UseNotificationReturn {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        // Check if notifications are supported
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setIsSupported(true);
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
        if (!isSupported) {
            console.warn('Notifications are not supported in this browser');
            return 'denied';
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'denied';
        }
    }, [isSupported]);

    const sendNotification = useCallback(
        (options: NotificationOptions): Notification | null => {
            if (!isSupported || permission !== 'granted') {
                console.warn('Cannot send notification: permission not granted');
                return null;
            }

            try {
                const notification = new Notification(options.title, {
                    body: options.body,
                    icon: options.icon || '/icon-192.png',
                    tag: options.tag,
                    requireInteraction: options.requireInteraction,
                });

                if (options.onClick) {
                    notification.onclick = () => {
                        window.focus();
                        options.onClick?.();
                        notification.close();
                    };
                }

                return notification;
            } catch (error) {
                console.error('Error sending notification:', error);
                return null;
            }
        },
        [isSupported, permission]
    );

    return {
        permission,
        isSupported,
        requestPermission,
        sendNotification,
    };
}

export default useNotification;
