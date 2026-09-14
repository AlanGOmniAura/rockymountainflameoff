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

const FOLDER_ID = '1Lcl0l5hpFJ95P93KK8yneDOKv7Iz7cQU';

async function listAndDownload() {
  try {
    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    console.log('Files found in folder:', res.data.files);

    const targetDir = path.join(__dirname, 'public', 'sponsors');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const file of res.data.files) {
      if (file.mimeType.includes('folder')) {
        console.log(`Skipping subfolder ${file.name}`);
        continue;
      }
      console.log(`Downloading ${file.name} (${file.id})...`);
      const destPath = path.join(targetDir, file.name);
      const resStream = await drive.files.get(
        { fileId: file.id, alt: 'media', supportsAllDrives: true },
        { responseType: 'stream' }
      );
      const destStream = fs.createWriteStream(destPath);
      await new Promise((resolve, reject) => {
        resStream.data
          .on('end', () => resolve())
          .on('error', err => reject(err))
          .pipe(destStream);
      });
      console.log(`Downloaded to ${destPath}`);
    }
  } catch (err) {
    console.error('Error fetching sponsors:', err);
  }
}

listAndDownload();
