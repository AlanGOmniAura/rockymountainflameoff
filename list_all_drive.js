const fs = require('fs');
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

async function listFiles() {
  const FOLDER_ID = '1Lcl0l5hpFJ95P93KK8yneDOKv7Iz7cQU';
  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  console.log('FOLDER 1Lcl0l5hpFJ95P93KK8yneDOKv7Iz7cQU FILES:');
  console.log(res.data.files);
}

listFiles().catch(console.error);
