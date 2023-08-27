import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import EpisodesList from './EpisodesList';
import AnimeInfoSmall from './AnimeInfoSmall';
import AnimeBox from './AnimeBox';
import EpisodeIndexContext from '../context/streamingEpisodeIndex/EpisodeIndexContext';
import VidStack from '../components/VidStack';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import LoadingContext from '../context/loading/LoadingContext';
import ErrorContext from '../context/error/ErrorContext';
import LoadingBar from 'react-top-loading-bar';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import GoToTopButton from './GoToTopButton';

export default function StreamingPage() {
    const animeId = useParams().animeId;
    const [searchParams, setSearchParams] = useSearchParams();
    let episodeNo = searchParams.get("ep");
    const [dataLoading, setDataLoading] = useState(true)
    const [lightState, setLightState] = useState(`On`);
    // const [streamingAnilistData, setStreamingAnilistData] = useState({});
    // const [streamingGogoData, setStreamingGogoData] = useState({});
    const [streamingAnimeData, setStreamingAnimeData] = useState({
        title: '',
        synopsis: '',
        image_url: '',
        totalEpisodes: '',
        currentEpisode: '',
        episodes: [],
        subOrDub: '',
        genres: [],
        rating: 0,
        status: '',
        score: '',
        popularity: '',
        duration: '',
        type: '',
        season: '',
        releaseDate: '',
        recommendations: []
    });
    const [streamingLinks, setStreamingLinks] = useState({});
    const [progress, setProgress] = useState(0);
    const [videoFetching, setVideoFetching] = useState(true);
    const streamingEpisodeIndex = useContext(EpisodeIndexContext);
    // const load = useContext(LoadingContext);
    // load.setLoadingState(true);
    const errorStatus = useContext(ErrorContext);

    const lightToggle = () => {
        if (lightState === `Off`) {
            setLightState(`On`)
        }
        else if (lightState === `On`) {
            setLightState(`Off`)
        }
    }

    const loadPreviousEpisodeIndex = () => {
        if (streamingEpisodeIndex.episodeIndex > 0) {
            episodeNo--;
            streamingEpisodeIndex.setEpisodeIndex(streamingEpisodeIndex.episodeIndex - 1);
            setSearchParams({ "ep": episodeNo });
        };
    }
    const loadNextEpisodeIndex = () => {
        if (streamingEpisodeIndex.episodeIndex < streamingAnimeData.episodes.length - 1) {
            episodeNo++;
            streamingEpisodeIndex.setEpisodeIndex(streamingEpisodeIndex.episodeIndex + 1);
            setSearchParams({ "ep": episodeNo });
        }
    }
    // const [streamingData, setStreamingData] = useState({})                                 //To Do
    // const [streamingAnilistData, setStreamingAnilistData] = useState({})
    // useEffect(() => {
    //     async function fetchStreamingData() {
    //         try {
    //             const fetchingZoroData = await fetch(`https://consumet-api-private.vercel.app/anime/zoro/info?id=spy-x-family-17977`);
    //             const fetchedZoroData = await fetchingZoroData.json();
    //             setStreamingData(fetchedZoroData);
    //             try {
    //                 const fetchingAnilistData = await fetch(`https://consumet-api-private.vercel.app/meta/anilist/info/${fetchedZoroData.alID}?provider={zoro}`);
    //                 const fetchedAnilistData = await fetchingAnilistData.json();
    //                 setStreamingAnilistData(fetchedAnilistData);
    //             } catch (error) {
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchStreamingData();
    //     // eslint-disable-next-line
    // }, [])
    // console.log(streamingData)
    // console.log(streamingAnilistData)

    useEffect(() => {
        async function fetchAnimeData() {
            try {
                errorStatus.setErrorState(false);
                console.log(errorStatus.errorState)
                setVideoFetching(true);
                const fetchingAnilistData = await fetch(`https://consumet-api-private.vercel.app/meta/anilist/info/${animeId}?provider=gogoanime`);
                const fetchedAnilistData = await fetchingAnilistData.json();
                if (!fetchingAnilistData.ok) {
                    errorStatus.setErrorState(true);
                }

                let fetchedTitle = '?';
                if (fetchedAnilistData.title.english !== null) {
                    fetchedTitle = fetchedAnilistData.title.english;
                }
                else if (fetchedAnilistData.title.romaji !== null) {
                    fetchedTitle = fetchedAnilistData.title.romaji;
                }
                setStreamingAnimeData({
                    title: fetchedTitle,
                    synopsis: fetchedAnilistData.description,
                    image_url: fetchedAnilistData.image,
                    totalEpisodes: fetchedAnilistData.totalEpisodes,
                    currentEpisode: fetchedAnilistData.currentEpisode,
                    episodes: fetchedAnilistData.episodes.reverse(),
                    subOrDub: fetchedAnilistData.subOrDub,
                    genres: fetchedAnilistData.genres,
                    rating: fetchedAnilistData.rating,
                    status: fetchedAnilistData.status,
                    score: fetchedAnilistData.rating,
                    popularity: fetchedAnilistData.popularity,
                    duration: fetchedAnilistData.duration,
                    type: fetchedAnilistData.type,
                    season: fetchedAnilistData.season,
                    releaseDate: fetchedAnilistData.releaseDate,
                    recommendations: fetchedAnilistData.recommendations
                })
                setProgress(50);
                // console.log(episodeNo)
                streamingEpisodeIndex.setEpisodeIndex(episodeNo - 1);
                // console.log(streamingAnimeData)
                const fetchingStreamingData = await fetch(`https://consumet-api-private.vercel.app/meta/anilist/watch/${streamingAnimeData.episodes[streamingEpisodeIndex.episodeIndex].id}`);

                if (fetchingStreamingData.status !== 200) {
                    const fetchingStreamingData = await fetch(`https://api.consumet.org/meta/anilist/watch/${streamingAnimeData.episodes[streamingEpisodeIndex.episodeIndex].id}`);
                    const fetchedStreamingData = await fetchingStreamingData.json();
                    setStreamingLinks({
                        "360p": `${fetchedStreamingData.sources[0].url}`,
                        "480p": `${fetchedStreamingData.sources[1].url}`,
                        "720p": `${fetchedStreamingData.sources[2].url}`,
                        "1080p": `${fetchedStreamingData.sources[3].url}`,
                        "default": `${fetchedStreamingData.sources[4].url}`,
                        "download": `${fetchedStreamingData.download}`,
                    });
                }

                else {
                    const fetchedStreamingData = await fetchingStreamingData.json();
                    setStreamingLinks({
                        "360p": `${fetchedStreamingData.sources[0].url}`,
                        "480p": `${fetchedStreamingData.sources[1].url}`,
                        "720p": `${fetchedStreamingData.sources[2].url}`,
                        "1080p": `${fetchedStreamingData.sources[3].url}`,
                        "default": `${fetchedStreamingData.sources[4].url}`,
                        "download": `${fetchedStreamingData.download}`,
                    });
                }
                setProgress(80);
                setVideoFetching(false);
            } catch (error) {
                // console.log("catch is running")                 //This will always run due to setState in react
                // errorStatus.setErrorState(true);
            }
            finally {
                setDataLoading(false);
                // load.setLoadingState(true);
                setProgress(100);
            }
        }
        fetchAnimeData();
        document.title = `Watch ${streamingAnimeData.title} - Episode ${episodeNo}`;
        // eslint-disable-next-line
    }, [dataLoading, streamingEpisodeIndex.episodeIndex, episodeNo, animeId, streamingAnimeData.title])


    return (
        <>
            {
                (!errorStatus.errorState) ? <div className="container">
                    <LoadingBar
                        color='#f11946'
                        progress={progress}
                        onLoaderFinished={() => setProgress(0)}
                    />
                    <Navbar />
                    <div id="streaming-page-top">
                        <div id="streaming-anime-info">
                            <AnimeInfoSmall dataLoading={dataLoading} title={(streamingAnimeData.title !== null) ? streamingAnimeData.title : ""} image_url={streamingAnimeData.image_url} sub_dub={(typeof streamingAnimeData.subOrDub !== 'undefined') ? streamingAnimeData.subOrDub.toUpperCase() : `?`} type={streamingAnimeData.type} currentEpisode={streamingAnimeData.currentEpisode} totalEpisodes={streamingAnimeData.totalEpisodes} genres={(streamingAnimeData.genres.length !== 0) ? streamingAnimeData.genres.toString() : `?`} status={(typeof streamingAnimeData.status !== 'undefined') ? streamingAnimeData.status.toUpperCase() : `?`} releaseDate={(typeof streamingAnimeData.releaseDate !== 'undefined') ? streamingAnimeData.releaseDate : `?`}
                                animeDuration={streamingAnimeData.duration} description={streamingAnimeData.synopsis} />
                        </div>
                        <div id="mobile-streaming-top">
                            <div id="streaming-video-container">
                                <div className="video-wrapper">
                                    {(videoFetching !== true && streamingLinks['default'] !== undefined) ?  // Extra Security
                                        <VidStack link={streamingLinks['default']} vidTitle={`Episode ${episodeNo}`} />
                                        :
                                        "Video Loading...."
                                    }
                                </div>
                                <div id="video-controls-info">
                                    {dataLoading ? <Skeleton width={'100%'} height={'19px'} style={{ borderRadius: '3px', margin: '4px' }} baseColor="#202020" highlightColor="#444" /> :
                                        <div id="video-controls-top">
                                            <div id="controls-left">
                                                <div id="light" onClick={lightToggle}>
                                                    <i className="fa-solid fa-lightbulb" style={{ color: `#ffffff` }}></i>
                                                    <p className='video-controls-margin'>Light<span className='video-controls-margin' style={{ color: `${lightState === 'Off' ? `#dc3545` : `#28a745`}` }}>{lightState}</span></p>
                                                </div>
                                            </div>
                                            <div id="controls-right">
                                                <i className="fa-solid fa-backward video-controls-margin" id='previous' title='Previous' style={{ color: `#ffffff` }} onClick={loadPreviousEpisodeIndex}></i>
                                                <i className="fa-solid fa-forward video-controls-margin" id='next' title='Next' style={{ color: `#ffffff` }} onClick={loadNextEpisodeIndex}></i>
                                                <i className="fa-solid fa-plus fa-lg video-controls-margin add-to-watchlist" title='Add To My Watchlist' style={{ color: `#ffffff` }}></i>
                                                <a href={`${streamingLinks['download']}`} target='_blank' rel="noreferrer"><i className="fa-solid fa-download video-controls-margin" title='Download' style={{ color: `#ffffff` }}></i></a>
                                            </div>
                                        </div>}
                                    <div id="video-controls-mid">
                                        {dataLoading ? <Skeleton width={'95%'} height={'200px'} style={{ borderRadius: '10px' }} baseColor="#202020" highlightColor="#444" /> :
                                            <div id="episode-info">
                                                <p>You are watching <span>{`Episode ${episodeNo}`}</span></p>
                                                <p>If current server doesn't work please try other servers beside.</p>
                                            </div>}

                                        <div id="sub-options">
                                            <div className="sub-dub-options-label">
                                                <i className="fa-solid fa-closed-captioning"></i>
                                                <p>SUB:</p>
                                            </div>
                                            <div className="server-options disabled" id='sub-server-options'>
                                                <button><p>Vidstreaming</p></button>
                                                <button><p>Gogo CDN</p></button>
                                            </div>
                                        </div>
                                        <div id="dub-options">
                                            <div className="sub-dub-options-label">
                                                <i className="fa-solid fa-closed-captioning"></i>
                                                <p>DUB:</p>
                                            </div>
                                            <div className="server-options disabled" id='dub-server-options'>
                                                <button><p>Vidstreaming</p></button>
                                                <button><p>Gogo CDN</p></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="episode-list" id="streaming-episode-list">
                                {dataLoading ? <Skeleton width={'100%'} height={'100%'} baseColor="#202020" highlightColor="#444" /> :
                                    <EpisodesList dataLoading={dataLoading} episodes={(streamingAnimeData.episodes.length !== 0) ? streamingAnimeData.episodes : []} currentEpisodeIndex={streamingEpisodeIndex.episodeIndex} />}
                            </div>
                        </div>
                    </div>
                    <div className="recommended-anime-container container">
                        <h2 id='recommended-title'>Recommended for you</h2>
                        <div id="streaming-anime-recommendation-container">
                            {/* return here from API call with the bellow code */}
                            {(streamingAnimeData.recommendations !== null && streamingAnimeData.recommendations.length !== 0) ?
                                streamingAnimeData.recommendations.map(elem => {
                                    let titleEnglish = '?';
                                    if (elem.title.english !== null && elem.title.english !== undefined) {
                                        titleEnglish = elem.title.english;
                                        if (titleEnglish.length > 40) {
                                            titleEnglish = titleEnglish.slice(0, 37) + '...';
                                        }
                                    }
                                    return (
                                        <AnimeBox key={elem.id} animeId={elem.id} image={elem.image} titleEnglish={titleEnglish} type={elem.type} duration={'?'} releaseDate={'?'} currentEpisode={elem.episodes} totalEpisodes={(elem.status.toLowerCase() === "completed") ? elem.episodes : 'Ongoing'} />
                                    )
                                })
                                :
                                <Skeleton width={'100vw'} height={'100vw'} style={{ borderRadius: '10px' }} baseColor="#202020" highlightColor="#444" />}
                        </div>
                    </div>
                    <GoToTopButton />
                </div>
                    :
                    <ErrorPage />
            }
        </>
    )
}
