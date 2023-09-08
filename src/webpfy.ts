export default async function webpfy({
    image,
    quality = 75,
}: {
    image: File | Blob;
    quality?: number;
}): Promise<{ webpBlob: Blob; fileName: string }> {
    try {
        // Extract the file name from the input image's name property
        const fileName =
            image instanceof File
                ? image.name.replace(/\.[^/.]+$/, "") + ".webp"
                : "webpfy.webp";

        // Create a new HTML Image element
        const img = new Image();

        // Create a canvas element to draw the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Unable to obtain 2D rendering context.");
        }

        // Load the input image
        img.src = URL.createObjectURL(image);

        // Wait for the image to load
        await new Promise<void>((resolve) => {
            img.onload = () => resolve();
        });

        // Set the canvas dimensions to match the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas content to a WebP Blob
        const webpBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        throw new Error("Failed to convert to WebP format.");
                    }
                },
                "image/webp",
                quality / 100
            );
        });

        return { webpBlob, fileName };
    } catch (error) {
        throw error;
    }
}
