import { getContent, publishContent } from '@/app/actions/content';
import { getPhotos } from '@/app/actions/gallery';
import { Globe, Eye } from 'lucide-react';
import ContentTabs from '@/components/admin/ContentTabs';
import HomeEditor from '@/components/admin/HomeEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import ClassesEditor from '@/components/admin/ClassesEditor';
import ClassDetailsEditor from '@/components/admin/ClassDetailsEditor';
import RentalsEditor from '@/components/admin/RentalsEditor';
import GeminiAssistant from '@/components/admin/GeminiAssistant';

export default async function ContentEditorPage() {
    const content = await getContent(true); // Get Draft
    const photos = await getPhotos(); // Get Gallery Photos for Picker

    // Safety checks
    const home = content.home || {};
    const about = content.about || {};
    const classesPage = content.classesPage || {};
    const classDetails = content.classDetails || {};
    const rentals = content.rentals || {};

    // rentals specific photos for the RentalsImagePicker
    const rentalsFolderId = rentals.galleryFolderId || '1Ef7JZPwn0mWdX-ggo8eNoSq694BQXAVH';
    const rentalsPhotos = await getPhotos(rentalsFolderId);

    return (
        <div className="mx-auto max-w-6xl pb-40">
            <ContentTabs
                key={JSON.stringify(content)}
                home={<HomeEditor data={home} photos={photos} />}
                about={<AboutEditor data={about} photos={photos} />}
                classesPage={<ClassesEditor data={classesPage} photos={photos} />}
                classDetails={<ClassDetailsEditor data={classDetails} photos={photos} />}
                rentals={<RentalsEditor data={rentals} photos={rentalsPhotos} />}
            />
            <GeminiAssistant />
        </div>
    );
}
