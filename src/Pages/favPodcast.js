import React from 'react'
import Podcasts from '../components/podcastCards';
function favPodcast({podcastData},{user}){
    return (
    <div key={podcastData.title} style={{ cursor: "pointer", width: '20rem' }} >
        <Podcasts post={podcastData}  />
    </div>
    )
}
export default favPodcast;