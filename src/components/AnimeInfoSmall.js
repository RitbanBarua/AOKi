import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function AnimeInfoSmall(props) {
    return (
        <>
            <div id="streaming-anime-info-container">
                {props.dataLoading ? <Skeleton width={'150px'} height={'210px'} baseColor="#202020" highlightColor="#444" /> :
                    <div id="streaming-anime-image-wrapper">
                        <img src={props.image_url} alt={props.title} />
                    </div>}
                {props.dataLoading ? <Skeleton width={'350px'} height={'50px'} baseColor="#202020" highlightColor="#444" /> :
                    <div id="streaming-anime-name">
                        <h2>{(props.title.length > 35) ? props.title.slice(0, 35) + "...." : props.title}</h2>
                    </div>}
                <div id="streaming-anime-info-small">
                    <div id="streaming-anime-info-small-left">
                        <div className="anime-quality-small anime-info-small"><p>HD</p></div>
                        <div className="anime-current-episode-count-small anime-info-small">
                            <i className="fa-solid fa-closed-captioning" style={{color: `#111`}}></i>
                            <p>{props.currentEpisode}</p></div>
                        <div className="anime-total-episode-count-small anime-info-small"><p>{props.totalEpisodes}</p></div>
                    </div>
                    <div className="dot"></div>
                    <div id="streaming-anime-info-small-mid">
                        <div className="anime-type"><p>{props.type}</p></div>
                    </div>
                    <div className="dot"></div>
                    <div id="streaming-anime-info-small-right">
                        <div className="anime-duration">{props.animeDuration + 'm'}</div>
                    </div>
                </div>
                <div id="streaming-anime-info-small-mobile">
                    <div id="animeSubDub"><p>Sub/Dub: <span>{props.sub_dub}</span></p></div>
                    <div id="animeType"><p>Type: <span>{props.type}</span></p></div>
                    <div id="animeCurrentEpisode"><p>Released Episodes: <span>{props.currentEpisodes}</span></p></div>
                    <div id="animeTotalEpisodes"><p>Total Episodes: <span>{props.totalEpisodes}</span></p></div>
                    <div id="animeGenres"><p>Genres: <span>{props.genres}</span></p></div>
                    <div id="animeStatus"><p>Status: <span>{props.status}</span></p></div>
                    <div id="animeReleaseDate"><p>Release Date: <span>{props.releaseDate}</span></p></div>
                </div>
                {props.dataLoading ? <Skeleton width={'350px'} height={'30vh'} baseColor="#202020" highlightColor="#444" /> :
                    <div id="streaming-anime-description">
                        <p>{props.description}</p>
                    </div>}
            </div>
        </>
    )
}
