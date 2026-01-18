import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/geo-locale
 * Detects user's country using Vercel's geoIP headers
 * Returns appropriate locale: 'tr' for Turkey, 'en' for others
 */
export async function GET(request: NextRequest) {
    try {
        // Vercel provides geoIP data in headers
        const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');

        // Default to 'tr' if country is Turkey, otherwise 'en'
        const locale = country === 'TR' ? 'tr' : 'en';

        return NextResponse.json({
            locale,
            country,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Geo-locale detection error:', error);
        return NextResponse.json(
            { locale: 'tr', error: 'Failed to detect locale' },
            { status: 500 }
        );
    }
}
