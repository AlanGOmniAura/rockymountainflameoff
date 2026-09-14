import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: false,
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                if (!user || !user.email) return false;

                const allowedEmails = (process.env.ADMIN_EMAILS || '')
                    .toLowerCase()
                    .split(',')
                    .map((e) => e.trim());
                const userEmail = user.email.toLowerCase().trim();
                const adminDomain = (process.env.ADMIN_DOMAIN || '').toLowerCase().trim();

                const isAllowedEmail = allowedEmails.includes(userEmail);
                const isAllowedDomain = adminDomain ? userEmail.endsWith(adminDomain) : false;

                return isAllowedEmail || isAllowedDomain;
            } catch (error) {
                console.error('[AUTH_SIGNIN_ERROR]', error);
                return false;
            }
        },
    },
    pages: {
        signIn: '/admin/login',
    },
});
