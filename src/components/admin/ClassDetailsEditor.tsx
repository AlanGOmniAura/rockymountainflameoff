import ClassDetailsEditorClient from './ClassDetailsEditorClient';

export default async function ClassDetailsEditor({ data, photos }: { data: any; photos: any[] }) {
    return <ClassDetailsEditorClient data={data} photos={photos} />;
}
