import ClassesEditorClient from './ClassesEditorClient';

export default async function ClassesEditor({ data, photos }: { data: any; photos: any[] }) {
    const sanitizedData = {
        heroSlides: data.heroSlides || [],
    };

    return <ClassesEditorClient data={sanitizedData} photos={photos} />;
}
