import PhotoDisplay from './PhotoDisplay';

// This is the type definition for the data that will be fetched from the API.
export type PhotoData = {
	id: number;
	title: string;
	path: string;
};
// This is the type definition for the props that will be passed to the Photo component.
type Props = {
	// params is an object with a photoId property that is a string.
	params: {
		photoId: string;
	};
};

// the photoId property of the params object will be destructured from the props object.
export default async function Photo({ params: { photoId } }: Props) {
	const response = await fetch(`http://localhost:3500/images/${photoId}`, {
		cache: 'no-store',
	}); // Fetch the photo data from the API.

	// Parse the response as JSON and assign it to the photoData variable.
	const photoData: PhotoData = await response.json();

	if (!photoData?.id) {
		// If the photoData object does not have an id property, return a message indicating that no photo was found.
		return <h1 className='text-center'>No Photo Found for that ID.</h1>;
	}

	return (
		<div className='mt-2 grid place-content-center'>
			<PhotoDisplay photoData={photoData} />
		</div>
	);
}
