import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import styles from './ContactPage.module.scss';
import { getSiteConfig } from '@/data/settings';

export default async function ContactPage() {
    const config = await getSiteConfig();
    const contact = config.contact || {};

    return (
        <main className={styles.contactPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Contact Us</h1>
                    <p>
                        Have questions about our classes, events, or studio rentals? We're here to
                        help you start your glass blowing journey.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Contact Info */}
                    <div className={styles.infoSection}>
                        <div className={styles.infoCard}>
                            <h3>
                                <Mail size={24} /> Email
                            </h3>
                            <a href={`mailto:${contact.email || 'info@glassclassdenver.com'}`}>
                                {contact.email || 'info@glassclassdenver.com'}
                            </a>
                        </div>

                        <div className={styles.infoCard}>
                            <h3>
                                <Phone size={24} /> Phone
                            </h3>
                            <a
                                href={`tel:${contact.phone?.replace(/[^0-9]/g, '') || '7209954742'}`}
                            >
                                {contact.phone || '(720) 995-4742'}
                            </a>
                        </div>

                        <div className={styles.infoCard}>
                            <h3>
                                <MapPin size={24} /> Studio Address
                            </h3>
                            <p>
                                {contact.address || '2830 S Elati St, Unit #4, Englewood, Co 80110'}
                            </p>
                            <a
                                href="https://maps.google.com/?q=2830 S Elati St, Unit %234, Englewood, Co 80110"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'block',
                                    marginTop: '0.5rem',
                                    textDecoration: 'underline',
                                }}
                            >
                                Get Directions
                            </a>
                        </div>

                        <div className={styles.infoCard}>
                            <h3>
                                <Instagram size={24} /> Social
                            </h3>
                            <a
                                href={
                                    contact.instagram ||
                                    'https://www.instagram.com/glassclassdenver/'
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @glassclassdenver
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className={styles.mapSection}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3071.123!2d-104.9937!3d39.6644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c7f4e8b3e3e3e%3A0x7b3e3e3e3e3e3e3e!2s2830%20S%20Elati%20St%2C%20Englewood%2C%20CO%2080110!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Glass Class Denver Location"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
