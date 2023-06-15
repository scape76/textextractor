export const getImageUrl = (imageId: Extraction["imageId"]) => {
  return `https://next-blogs-bucket.s3.eu-central-1.amazonaws.com/${imageId}`;
};
