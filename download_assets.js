const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const env = require('yaml').parse(fs.readFileSync('env.yaml', 'utf8'));

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

const filesToDownload = [
  { id: '1S45ItY0Mi0fftEK1GLhsNUBTZV_OqZh0', dest: 'public/fonts/RussellSquare.otf' },
  { id: '13wVam1sYJmFaA8ci3FrOuTlG4MjNo8qS', dest: 'public/fonts/RussellSquare-Oblique.otf' },
  { id: '1GCoZEmjav--IOeJMRIBmSPkLNpd-ZCt0', dest: 'public/fonts/RussellSquare-Italic2.otf' },
  { id: '1KitO3EIVLBdHiF3D_twCs4XQ5m6fwx-g', dest: 'public/bg.png' },
  { id: '1KyDU2DPEBiqb8zs_5jnXkHhIUgoo2-D8', dest: 'public/logo.png' }
];

if (!fs.existsSync('public/fonts')) {
    fs.mkdirSync('public/fonts', { recursive: true });
}

async function downloadFiles() {
  for (const file of filesToDownload) {
    console.log(`Downloading ${file.dest}...`);
    try {
      const res = await drive.files.get(
        { fileId: file.id, alt: 'media', supportsAllDrives: true },
        { responseType: 'stream' }
      );
      const destStream = fs.createWriteStream(file.dest);
      await new Promise((resolve, reject) => {
        res.data
          .on('end', () => resolve())
          .on('error', err => reject(err))
          .pipe(destStream);
      });
      console.log(`Successfully downloaded ${file.dest}`);
    } catch (err) {
      console.error(`Failed to download ${file.dest}:`, err.message);
    }
  }
}

downloadFiles();
