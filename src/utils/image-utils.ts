import favicon from '$lib/assets/favicon.svg';

export const getSafeImageContentFromBase64 = (imageData: string | undefined): string => {
	if (!imageData) {
		return favicon;
	}

	return `data:image/png;base64,${imageData}`;
};
