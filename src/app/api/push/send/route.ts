import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Configure web-push with VAPID details
// Generate keys at: https://vapidkeys.com/
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
        `mailto:${process.env.ADMIN_EMAIL || 'admin@example.com'}`,
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
}

interface PushPayload {
    title: string;
    body?: string;
    icon?: string;
    url?: string;
    tag?: string;
}

/**
 * POST /api/push/send
 * Send push notification to subscribed users
 * Protected endpoint - requires authentication in production
 */
export async function POST(request: Request) {
    try {
        // In production, verify admin authentication here
        const authHeader = request.headers.get('authorization');
        const apiKey = process.env.PUSH_API_KEY;

        if (apiKey && authHeader !== `Bearer ${apiKey}`) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { subscription, payload } = (await request.json()) as {
            subscription: webpush.PushSubscription;
            payload: PushPayload;
        };

        if (!subscription || !payload) {
            return NextResponse.json(
                { message: 'Subscription and payload are required' },
                { status: 400 }
            );
        }

        // Validate VAPID configuration
        if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
            return NextResponse.json(
                { message: 'Push notifications not configured' },
                { status: 503 }
            );
        }

        // Send push notification
        await webpush.sendNotification(
            subscription,
            JSON.stringify({
                title: payload.title,
                body: payload.body || '',
                icon: payload.icon || '/icon-192.png',
                url: payload.url || '/',
                tag: payload.tag || 'notification',
            })
        );

        return NextResponse.json({
            success: true,
            message: 'Notification sent successfully',
        });
    } catch (error) {
        console.error('Push notification send error:', error);

        // Handle expired subscriptions
        if (error instanceof webpush.WebPushError && error.statusCode === 410) {
            return NextResponse.json(
                { message: 'Subscription has expired', expired: true },
                { status: 410 }
            );
        }

        return NextResponse.json(
            { message: 'Failed to send notification' },
            { status: 500 }
        );
    }
}
