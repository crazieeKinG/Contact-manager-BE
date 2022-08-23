export const getImageCloudinaryId = (imageUrl: string) => {
    const imageName = imageUrl.split("/").pop();
    const assetId = (<string>imageName).split(".")[0];
    return assetId;
};
