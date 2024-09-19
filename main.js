// Array of video data with unique IDs, title, description, and video URLs
const videos = [
    {
        id: 'video1',
        title: 'First Video',
        description: 'This is the first video description.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_1/0.jpg'
    },
    {
        id: 'video2',
        title: 'Second Video',
        description: 'This is the second video description.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_2/0.jpg'
    }
];

// Function to load video list on the main page
function loadVideoList() {
    const videoList = document.getElementById('video-list');

    videos.forEach(video => {
        // Create video item container
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        // Create video thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;
        thumbnail.alt = video.title;

        // Create video title link
        const videoLink = document.createElement('a');
        videoLink.href = `${video.id}.html`; // Link to dynamically generated page
        videoLink.innerHTML = `<h3>${video.title}</h3>`;

        // Append thumbnail and title to video item
        videoItem.appendChild(thumbnail);
        videoItem.appendChild(videoLink);

        // Append video item to the main list
        videoList.appendChild(videoItem);

        // Create video page dynamically if it doesn't exist
        generateVideoPage(video);
    });
}

// Function to generate video pages dynamically
function generateVideoPage(video) {
    // Create a new HTML file content
    const videoPageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${video.title}</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>${video.title}</h1>
        <iframe width="560" height="315" src="${video.videoUrl}" frameborder="0" allowfullscreen></iframe>
        <p>${video.description}</p>
        <a href="index.html">Back to Home</a>
    </body>
    </html>`;

    // Create a Blob (in-memory file)
    const videoBlob = new Blob([videoPageContent], { type: 'text/html' });

    // Create a download link for the new page
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(videoBlob);
    downloadLink.download = `${video.id}.html`; // The file will be named according to the video ID

    // Automatically download the new HTML file
    downloadLink.click();
}

// Initialize the video list on page load
window.onload = loadVideoList;
