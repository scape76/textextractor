export const getImageUrl = (imageId: Extraction["imageId"]) => {
  return `http://localhost:9000/textextractor/${imageId}`;
};
