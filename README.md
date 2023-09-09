# webpfy

`webpfy` is a utility for converting images to the WebP format. It provides a simple and efficient way to convert images in various formats (e.g., JPEG, PNG) to the modern and highly efficient WebP format, reducing image file sizes without compromising quality.

## Installation

To use `webpfy` in your project, you can install it via npm:

```bash
npm install webpfy
# or
yarn add webpfy
```

## Usage

To convert an image to WebP format using `webpfy`, you can import the function and use it as follows:

```js
import webpfy from 'webpfy';

// Specify the image you want to convert (e.g., a File or Blob)
const image = /* Provide your image here */;

// Optionally, specify the quality (default is 75)
const quality = 75;

// Create options object
const options = {
	image,
	quality
};

// Use webpfy to convert the image
webpfy(options)
	.then(result => {
		// Handle the result
		console.log(`WebP Blob: ${result.webpBlob}`);
		console.log(`WebP File Name: ${result.fileName}`);
		// Save or use the WebP Blob or file name as needed
	})
	.catch(error => {
		// Handle errors
		console.error(error);
	});
```

## Options

`image`: The image to convert, which can be a File or Blob object representing the image file.

`quality` (optional): The quality of the WebP image, ranging from 0 to 100 (default is 75). Higher values result in higher quality but larger file sizes.

## Return Types

`webpBlob`: The converted image as a Blob object in WebP format.

`fileName`: The suggested file name for the converted WebP image.

## Examples

The examples may not be clean code but they are just examples. You can use `webpfy` in any way you want. All you need is to call the function with the right parameters. And you can use the returned values in any way you want.

Here's how I use `webpfy` in my React project,

```js
/* rest of the relevant code */

const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    try {
        const { webpBlob, fileName } = await webpfy({ image: file }); // keeping the quality default

        // Pass the webpBlob and fileName to the parent component to make API calls
        getImage(webpBlob, fileName);
    } catch (error) {
        console.error("Error converting image to WebP:", error);
    }
};

/* rest of the relevant code */

<input
    type="file"
    name="image"
    id="image"
    accept="images/*"
    onChange={handleFileUpload}
/>;

/* rest of the relevant code */
```

Here's a complete example of how to use `webpfy` in a React component,

```js
import React, { useState } from "react";
import webpfy from "webpfy";

function ImageConverter() {
    const [webpBlob, setWebpBlob] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const imageFile = event.target.files[0];

        if (imageFile) {
            webpfy({ image: imageFile })
                .then((result) => {
                    const { webpBlob, fileName } = result;
                    setWebpBlob(webpBlob);
                    setFileName(fileName);
                })
                .catch((error) => {
                    console.error("Image conversion error:", error);
                });
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {webpBlob && (
                <div>
                    <h3>Converted WebP Image:</h3>
                    <img src={URL.createObjectURL(webpBlob)} alt={fileName} />
                    <a href={URL.createObjectURL(webpBlob)} download={fileName}>
                        Download WebP Image
                    </a>
                </div>
            )}
        </div>
    );
}

export default ImageConverter;
```

Here's an example of converting an image and making API calls,

```js
import webpfy from "webpfy";

// Specify the image file to be converted (replace with your file input)
const fileInput = document.getElementById("fileInput"); // Replace 'fileInput' with your HTML input ID
const imageFile = fileInput.files[0];

// Optionally, specify the quality (default is 75)
const quality = 75;

// Create options object for image conversion
const options = {
    image: imageFile,
    quality,
};

// Use webpfy to convert the image
webpfy(options)
    .then(async (result) => {
        // Create a FormData object
        const formData = new FormData();

        // Append the converted WebP image to the FormData object
        formData.append(
            "your-image-field-name-here",
            result.webpBlob,
            result.fileName
        );

        try {
            // Make an API call using fetch to upload the converted WebP image
            const response = await fetch("https://example.com/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                // Handle the API response
                console.log("Image uploaded successfully:", responseData);
            } else {
                // Handle API call errors
                console.error(
                    "API call failed:",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            // Handle network errors or other issues
            console.error("API call failed:", error);
        }
    })
    .catch((error) => {
        // Handle errors during image conversion
        console.error("Image conversion error:", error);
    });
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/IamLizu/webpfy/blob/main/LICENSE) file for details.

Feel free to customize the README file further to match your project's specific requirements and branding. This README provides a basic structure with documentation, usage instructions, and an example for using `webpfy` in a React application.
