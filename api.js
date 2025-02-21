// api.js

const API_KEY = 'AIzaSyDJp5yqDh9TajfQyh8WZusA5U--VVdYHpQ'; // Replace with your YouTube API key
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function fetchVideos(query) {
    try {
        const response = await fetch(`${API_URL}?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}
// app.js

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const videoList = document.getElementById('video-list');
    const videoPlayer = document.getElementById('video-player');

    // Handle search button click
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            const videos = await fetchVideos(query);
            displayVideos(videos);
        }
    });

    // Display the list of videos
    function displayVideos(videos) {
        videoList.innerHTML = ''; // Clear previous results

        videos.forEach((video) => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            videoItem.innerHTML = `
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" />
                <h3>${video.snippet.title}</h3>
            `;
            videoItem.addEventListener('click', () => {
                displayVideoPlayer(video);
            });

            videoList.appendChild(videoItem);
        });
    }

    // Display the selected video in the video player
    function displayVideoPlayer(video) {
        const videoId = video.id.videoId;
        videoPlayer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
});
