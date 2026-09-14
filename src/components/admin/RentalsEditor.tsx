import RentalsEditorClient from './RentalsEditorClient';

export default async function RentalsEditor({ data, photos }: { data: any; photos: any[] }) {
    return <RentalsEditorClient data={data} photos={photos} />;
}
