// Reduce image resolution for performance
const reduceImageResolution = (img: HTMLImageElement): string => {
  const canvasTemp = document.createElement('canvas');
  const ctx = canvasTemp.getContext('2d');
  const scaleFactor = 0.5;
  canvasTemp.width = img.width * scaleFactor;
  canvasTemp.height = img.height * scaleFactor;
  if (ctx) ctx.drawImage(img, 0, 0, canvasTemp.width, canvasTemp.height);
  return canvasTemp.toDataURL();
};

const imageHelper = {
  reduceImageResolution,
};

export default imageHelper;
