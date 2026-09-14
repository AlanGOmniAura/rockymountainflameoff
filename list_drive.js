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

drive.files.list({
  q: "'1DC9oWSdRXUYfivL59OmIfw0TIV2MymET' in parents",
  fields: 'files(id, name, mimeType)',
  supportsAllDrives: true,
  includeItemsFromAllDrives: true,
}).then(res => {
  console.log(JSON.stringify(res.data.files, null, 2));
}).catch(err => console.error(err));
