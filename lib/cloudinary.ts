// lib/cloudinary.ts

const CLOUD_NAME = "dlnn95ku7";

export function getImageUrl(publicIdOrUrl: string, width: number = 800): string {
  // If the string is already a full HTTP URL, just return it directly!
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    return publicIdOrUrl;
  }

  // Otherwise, treat it as a Public ID and build the Cloudinary URL
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_scale,w_${width}/f_auto,q_auto/${publicIdOrUrl}`;
}

export function getRawFileUrl(publicIdOrUrl: string): string {
  // If it's already a full URL, return it directly
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    return publicIdOrUrl;
  }

  // Otherwise, treat it as a Public ID and append .glb
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicIdOrUrl}.glb`;
}