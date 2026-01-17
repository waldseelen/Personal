import { NextResponse } from 'next/server';

/**
 * POST /api/push/unsubscribe
 * Remove push notification subscription
 */
export async function POST(request: Request) {
    try {
        const { endpoint } = await request.json();

        if (!endpoint) {
            return NextResponse.json(
                { message: 'Endpoint is required' },
                { status: 400 }
            );
        }

        // In production, remove from database
        if (process.env.NODE_ENV === 'development') {
            console.warn('Unsubscribed:', endpoint);
        }

        return NextResponse.json({
            success: true,
            message: 'Unsubscribed successfully',
        });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        return NextResponse.json(
            { message: 'Failed to unsubscribe' },
            { status: 500 }
        );
    }
}
