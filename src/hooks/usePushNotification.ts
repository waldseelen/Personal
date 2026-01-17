'use client';

import { useCallback, useEffect, useState } from 'react';

interface UsePushNotificationReturn {
    isSupported: boolean;
    isSubscribed: boolean;
    subscription: PushSubscription | null;
    subscribe: () => Promise<PushSubscription | null>;
    unsubscribe: () => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
}

/**
 * VAPID public key for push notifications
 * Generate yours at: https://vapidkeys.com/
 * Store public key here, private key in environment variables
 */
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

/**
 * Convert URL-safe base64 string to Uint8Array
 * Required for Push API applicationServerKey
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * Hook for managing push notification subscriptions
 * Handles subscription, unsubscription, and permission requests
 */
export function usePushNotification(): UsePushNotificationReturn {
    const [isSupported, setIsSupported] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for push notification support and existing subscription
    useEffect(() => {
        const checkSupport = async () => {
            if (typeof window === 'undefined') return;

            const supported = 'serviceWorker' in navigator && 'PushManager' in window;
            setIsSupported(supported);

            if (!supported) {
                setIsLoading(false);
                return;
            }

            try {
                const registration = await navigator.serviceWorker.ready;
                const existingSubscription = await registration.pushManager.getSubscription();

                if (existingSubscription) {
                    setSubscription(existingSubscription);
                    setIsSubscribed(true);
                }
            } catch (err) {
                console.error('Error checking push subscription:', err);
                setError('Abonelik durumu kontrol edilemedi');
            } finally {
                setIsLoading(false);
            }
        };

        checkSupport();
    }, []);

    /**
     * Subscribe to push notifications
     * Requests permission if needed and creates a new subscription
     */
    const subscribe = useCallback(async (): Promise<PushSubscription | null> => {
        if (!isSupported) {
            setError('Push notifications are not supported');
            return null;
        }

        if (!VAPID_PUBLIC_KEY) {
            setError('VAPID public key is not configured');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Request notification permission
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                setError('Bildirim izni reddedildi');
                return null;
            }

            const registration = await navigator.serviceWorker.ready;

            // Subscribe to push notifications
            const newSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
            });

            // Send subscription to server
            const response = await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscription: newSubscription.toJSON(),
                }),
            });

            if (!response.ok) {
                throw new Error('Server subscription failed');
            }

            setSubscription(newSubscription);
            setIsSubscribed(true);
            return newSubscription;
        } catch (err) {
            console.error('Push subscription error:', err);
            setError('Abonelik oluşturulamadı');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [isSupported]);

    /**
     * Unsubscribe from push notifications
     */
    const unsubscribe = useCallback(async (): Promise<boolean> => {
        if (!subscription) {
            setError('No active subscription');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Notify server of unsubscription
            await fetch('/api/push/unsubscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    endpoint: subscription.endpoint,
                }),
            });

            // Unsubscribe from push manager
            await subscription.unsubscribe();

            setSubscription(null);
            setIsSubscribed(false);
            return true;
        } catch (err) {
            console.error('Push unsubscription error:', err);
            setError('Abonelik iptal edilemedi');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [subscription]);

    return {
        isSupported,
        isSubscribed,
        subscription,
        subscribe,
        unsubscribe,
        isLoading,
        error,
    };
}

export default usePushNotification;
