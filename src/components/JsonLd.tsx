import { getGoogleReviews, type PlaceDetails } from '@/app/actions/reviews';
import { getSiteConfig } from '@/data/settings';

export default async function JsonLd() {
    // Fetch rating data from the same Google Places call that powers the carousel
    const reviewData = await getGoogleReviews();
    const config = await getSiteConfig();
    const contact = config.contact || {};

    const rating =
        reviewData && !('error' in reviewData) ? (reviewData as PlaceDetails).rating : 4.9;
    const reviewCount =
        reviewData && !('error' in reviewData)
            ? (reviewData as PlaceDetails).user_ratings_total
            : 400;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Glass Class Denver',
        image: 'https://glassclassdenver.com/images/hero-real.webp',
        url: 'https://glassclassdenver.com',
        telephone: contact.phone || '(720) 995-4742',
        email: contact.email || 'info@glassclassdenver.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '2830 S Elati St, Unit #4',
            addressLocality: 'Englewood',
            addressRegion: 'CO',
            postalCode: '80110',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 39.6441,
            longitude: -104.9935,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '20:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '10:00',
                closes: '18:00',
            },
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.toString(),
            reviewCount: reviewCount.toString(),
            bestRating: '5',
            worstRating: '1',
        },
        priceRange: '$$',
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Credit Card',
        sameAs: [
            contact.instagram ||
                'https://www.instagram.com/glassclassdenver/',
        ],
        hasMap: 'https://maps.google.com/?q=2830+S+Elati+St,+Unit+%234+Englewood+CO+80110',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
