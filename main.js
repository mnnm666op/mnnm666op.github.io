// Use LocalStorage to store video and channel data
const storedChannels = JSON.parse(localStorage.getItem('channels')) || [];
const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];

// Function to load channels into the select box and channel list
function loadChannels() {
    const channelSelect = document.getElementById('channel-select');
    const channelList = document.getElementById('channel-list');
    channelSelect.innerHTML = '';
    channelList.innerHTML = '';

    storedChannels.forEach(channel => {
        // Add to the select dropdown
        const option = document.createElement('option');
        option.value = channel.name;
        option.textContent = channel.name;
        channelSelect.appendChild(option);

        // Add to the list of channels
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${channel.name}</strong> (Videos: ${channel.videos.length})`;
        listItem.onclick = () => viewChannel(channel.name);
        channelList.appendChild(listItem);
    });
}

// Function to create a new channel
function createChannel() {
    const channelName = document.getElementById('channel-name').value.trim();
    if (!channelName) {
        alert('Please enter a channel name.');
        return;
    }

    const newChannel = {
        name: channelName,
        videos: []
    };

    // Add the new channel to the storedChannels array
    storedChannels.push(newChannel);
    localStorage.setItem('channels', JSON.stringify(storedChannels));

    // Clear the input and reload the channels
    document.getElementById('channel-name').value = '';
    loadChannels();
}

// Function to post a new video to a selected channel
function postVideo() {
    const channelName = document.getElementById('channel-select').value;
    const videoTitle = document.getElementById('video-title').value.trim();
    const videoUrl = document.getElementById('video-url').value.trim();
    const videoThumbnail = document.getElementById('video-thumbnail').value.trim();
    const videoDescription = document.getElementById('video-description').value.trim();

    if (!videoTitle || !videoUrl || !videoThumbnail || !videoDescription) {
        alert('Please fill out all video details.');
        return;
    }

    const newVideo = {
        id: `video-${Date.now()}`,  // Unique ID
        title: videoTitle,
        url: videoUrl,
        thumbnail: videoThumbnail,
        description: videoDescription,
        channel: channelName
    };

    // Find the channel in storedChannels and add the video
    const channel = storedChannels.find(ch => ch.name === channelName);
    channel.videos.push(newVideo);

    // Save the updated data in LocalStorage
    storedVideos.push(newVideo);
    localStorage.setItem('videos', JSON.stringify(storedVideos));
    localStorage.setItem('channels', JSON.stringify(storedChannels));

    // Clear input fields and reload the video list
    document.getElementById('video-title').value = '';
    document.getElementById('video-url').value = '';
    document.getElementById('video-thumbnail').value = '';
    document.getElementById('video-description').value = '';
    loadVideos();
}

// Function to load videos on the main page
function loadVideos() {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';

    storedVideos.forEach(video => {
        // Create video item container
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        // Video thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;
        thumbnail.alt = video.title;

        // Video title
        const title = document.createElement('h3');
        title.textContent = video.title;

        // Append video details
        videoItem.appendChild(thumbnail);
        videoItem.appendChild(title);
        videoItem.innerHTML += `<p>${video.description}</p>`;

        // Append to the video list
        videoList.appendChild(videoItem);
    });
}

// Function to view videos in a specific channel
function viewChannel(channelName) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';

    const channel = storedChannels.find(ch => ch.name === channelName);

    if (channel && channel.videos.length > 0) {
        channel.videos.forEach(video => {
            // Create video item container
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');

            // Video thumbnail
            const thumbnail = document.createElement('img');
            thumbnail.src = video.thumbnail;
            thumbnail.alt = video.title;

            // Video title
            const title = document.createElement('h3');
            title.textContent = video.title;

            // Append video details
            videoItem.appendChild(thumbnail);
            videoItem.appendChild(title);
            videoItem.innerHTML += `<p>${video.description}</p>`;

            // Append to the video list
            videoList.appendChild(videoItem);
        });
    } else {
        videoList.innerHTML = `<p>No videos in this channel.</p>`;
    }
}

// Initialize the page
window.onload = () => {
    loadChannels();
    loadVideos();
};
