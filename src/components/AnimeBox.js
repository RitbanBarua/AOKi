import React from 'react'
import { Link } from 'react-router-dom';

export default function AnimeBox(props) {
    const { animeId, epNo = 1, image, titleEnglish, type, duration, releaseDate, currentEpisode, totalEpisodes } = props;
    return (
        <Link to={{
            pathname: `/watch/${animeId}`,
            search: `?ep=${epNo}`, // inject code value into template
        }}>
            <div className='style-container'>
                <div className="anime-recommendation-container">
                    <img src={image} alt={titleEnglish} />
                    <div className='recommended-anime-info'>
                        <div className="recommended-anime-title">{titleEnglish}</div>
                        <div className="recommended-anime-other-info">
                            <div className="recommended-anime-type">{type}</div>
                            <div className="dot"></div>
                            <div className="recommended-anime-duration">{duration}</div>
                            <div className="dot"></div>
                            <div className="recommended-anime-release-date">{releaseDate}</div>
                        </div>
                    </div>
                </div>
                <div className="anime-wrapper">
                    <div className="anime-info-small-btn">
                        <div className="anime-current-episode-count-small anime-info-small anime-box-current-episode-count">
                            <i className="fa-solid fa-closed-captioning" style={{ color: `#111` }}></i>
                            <p>{currentEpisode}</p></div>
                        <div className="anime-total-episode-count-small anime-info-small"><p>{totalEpisodes}</p></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
