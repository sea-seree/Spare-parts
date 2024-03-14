import axios from "axios";

export async function addPhotoToCloud(photo) {
    let repoUrl = "https://api.cloudinary.com/v1_1/dif2wztfi/image/upload";
    let dataUrl = '';
    let formData = new FormData();
    for (let i = 0; i < photo.length; i++) {
        let file = photo[i]; // Use the correct index to access each image
        // Append each image file and the upload preset to the form data
        formData.append("file", file);
        formData.append("upload_preset", "afxr11iv");

        // Send a POST request to the Cloudinary API
        await axios.post(repoUrl, formData)
            .then(res => {
                // console.log("Upload Success! ", res.data.url);
                dataUrl = res.data.url;
            })
            .catch(error => {
                console.log(error);
                console.error(error); // Handle any errors
            });
    }
    return dataUrl;
}