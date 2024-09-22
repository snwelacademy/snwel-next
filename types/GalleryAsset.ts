export type GalleryAsset = {
    _id: string,
    name: string;
    description?: string;
    link: string; // URL for the image or video
    timestamp: Date;
    likesCount: number;
    linkType: 'image'|'youtube'
    extension?: string; // e.g., 'jpg', 'png', 'mp4'
    sequence: number; // For sequencing the assets
}

