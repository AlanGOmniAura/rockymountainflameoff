import AboutEditorClient from './AboutEditorClient';

export default async function AboutEditor({ data, photos }: { data: any; photos: any[] }) {
    const sanitizedData = {
        instructor: data.instructor || {},
        studio: data.studio || {},
    };

    return <AboutEditorClient data={sanitizedData} photos={photos} />;
}
