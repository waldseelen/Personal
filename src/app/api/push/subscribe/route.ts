import { NextResponse } from 'next/server';

// In production, store subscriptions in a database (e.g., Sanity, Redis, PostgreSQL)
// This is a temporary in-memory store for demonstration
const subscriptions = new Map<string, PushSubscription>();

/**
 * POST /api/push/subscribe
 * Store push notification subscription
 */
export async function POST(request: Request) {
    try {
        const { subscription } = await request.json();

        if (!subscription || !subscription.endpoint) {
            return NextResponse.json(
                { message: 'Invalid subscription data' },
                { status: 400 }
            );
        }

        // Store subscription (in production, save to database)
        subscriptions.set(subscription.endpoint, subscription);

        // Log for debugging (use proper logging service in production)
        if (process.env.NODE_ENV === 'development') {
            console.warn('New push subscription:', subscription.endpoint);
        }

        return NextResponse.json({
            success: true,
            message: 'Subscription saved successfully',
        });
    } catch (error) {
        console.error('Push subscription error:', error);
        return NextResponse.json(
            { message: 'Failed to save subscription' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/push/subscribe
 * Check subscription status (for debugging)
 */
export async function GET() {
    return NextResponse.json({
        subscriptionCount: subscriptions.size,
        message: 'Push notification service is running',
    });
}
