import React, { useContext, useEffect } from 'react'
import LoadingContext from '../context/loading/LoadingContext';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import AnimeBox from './AnimeBox';
import loaderSmall from '../assests/LoadingAnimation-small.gif'
import InfiniteScroll from 'react-infinite-scroll-component';
import GoToTopButton from './GoToTopButton';

export default function Home() {
  const [dataLoading, setDataLoading] = useState(true);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [latestAnime, setLatestAnime] = useState([]);
  const [latestAnimePageNo, setLatestAnimePageNo] = useState(1);
  const [hasMoreLatestAnime, setHasMoreLatestAnime] = useState(false);
  const load = useContext(LoadingContext);
  console.log(load)
  console.log(load.loadingState)
  setTimeout(() => {
    load.setLoadingState(true)
    console.log(load.loadingState)
  }, 5000);
  const [progress, setProgress] = useState(0);

  const fetchTrendingAnime = async () => {
    try {
      const fetchingTrendingAnime = await fetch("https://api.consumet.org/meta/anilist/trending?page=1&perPage=12");
      const fetchedTrendingAnime = await fetchingTrendingAnime.json();
      setTrendingAnime(fetchedTrendingAnime.results);
      console.log(trendingAnime);
      // setDataLoading(false);
    } catch (error) {
      console.log(error);
      console.log("catch running");
      // Will be Added In Future Update
      //   try {           
      //     const fetchingTrendingAnime = await fetch("https://api.consumet.org/anime/gogoanime/top-airing?page=1");
      //     const fetchedTrendingAnime = await fetchingTrendingAnime.json();
      //     setTrendingAnime(fetchedTrendingAnime.results);
      //     console.log(trendingAnime);
      //     setDataLoading(false);
      //   } catch (error) {
      //     console.log(error);
      //   }
    }
  }


  const fetchLatestAnime = async (anilistURL) => {
    try {
      const fetchingLatestAnime = await fetch(anilistURL);
      const fetchedLatestAnime = await fetchingLatestAnime.json();
      setLatestAnime(latestAnime.concat(fetchedLatestAnime.results));
      console.log(latestAnime);
      setHasMoreLatestAnime(fetchedLatestAnime.hasNextPage);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
      console.log("catch running");
    }
  }

  const loadMoreLatestAnime = () => {
    setLatestAnimePageNo(latestAnimePageNo + 1);
  }
  let i = 0;

  document.title = "AOKi - Home";

  useEffect(() => {
    setProgress(0);
    fetchTrendingAnime();
    setProgress(50);
    fetchLatestAnime(`https://api.consumet.org/meta/anilist/recent-episodes?page=${latestAnimePageNo}&perPage=14&provider=gogoanime`);
    setProgress(100);
    // eslint-disable-next-line
  }, [dataLoading, latestAnimePageNo]);


  return (
    <>
      <div className="container" id='home-container'>
        <Navbar bgColor={"transparent"} />
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="hero-container">
          {/* <img src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/128893-pAA7PjY8l7dy.jpg" alt="" />  use ::before */}
          <div id="hero-anime-info">
            <div id="hero-spotlight"><p>#1 on Spotlight</p></div>
            <div id="hero-title"><h1>Hell's Paradise</h1></div>
            <div id="hero-anime-small-info-container">
              <div className="anime-type hero-flex">
                <i className="fa-solid fa-circle-play" style={{ color: `#ffffff` }}></i>
                <p>TV</p>
              </div>
              <div className="anime-duration hero-flex">
                <i className="fa-solid fa-clock" style={{ color: "#ffffff" }}></i>
                <p>24m</p>
              </div>
              <div className="anime-release-date hero-flex">
                <i className="fa-solid fa-calendar" style={{ color: "#ffffff" }}></i>
                <p>2023</p>
              </div>
              <div id="hero-anime-info-small-btn">
                <div className="anime-current-episode-count-small anime-info-small" id='hero-current-episode'>
                  <i className="fa-solid fa-closed-captioning" style={{ color: `#111` }}></i>
                  <p>13</p></div>
                <div className="anime-total-episode-count-small anime-info-small" id='hero-total-episode'><p>13</p></div>
              </div>
            </div>
            <div id="hero-description"><p>{"The Edo period is nearing its end. Gabimaru, a shinobi formerly known as the strongest in Iwagakure who is now a death row convict, is told that he will be acquitted and set free if he can bring back the Elixir of Life from an island that is rumored to be the Buddhist pure land Sukhavati. In hopes...<br> <br> (Source: Crunchyroll)"}</p></div>
            <div className="anime-btn-container" id="hero-anime-btn-container">
              <Link to="/watch/128893?ep=1">
                <button className="watch-now-btn">
                  <p>Watch Now</p>
                  <i className="fa-solid fa-circle-play" style={{ color: `#111`, lineHeight: `0px` }}></i>
                </button>
              </Link>
              <Link to="/watch/128893?ep=1">
                <button className="detail-btn">
                  <p>Detail</p>
                  <i className="fa-solid fa-chevron-right" style={{ color: '#ffffff' }}></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="slider-btn-container">                 {/* To Do */}
            <button className="slider-btn slider-hero-btn" id="next-btn">
              <i className="fa-solid fa-chevron-right" style={{ color: '#ffffff' }}></i>
            </button>
            <button className="slider-btn slider-hero-btn" id="previous-btn">
              <i className="fa-solid fa-chevron-left" style={{ color: '#ffffff' }}></i>
            </button>
          </div>
        </div>
        <div className="trending-anime-container container">
          <div id="hero-bottom-shadow"></div>         {/* Hero Bottom Style */}
          <div className="home-divs-top home-divs-top-flex">
            <h2>Trending</h2>
            <div className='disabled'>
              <p>See More</p>
              <i className="fa-solid fa-arrow-right" style={{ color: '#ffffff' }}></i>
            </div>
          </div>
          <div className="anime-container">
            {(trendingAnime.length !== 0) ?
              trendingAnime.map((elem) => {
                let title = '?';
                if(elem.title.english !== null){
                  title = elem.title.english;
                }
                else if(elem.title.romaji !== null){
                  title = elem.title.romaji;
                }
                if (title.length > 35) {
                  title = title.slice(0, 30) + '...';
                }

                return (
                  <AnimeBox key={elem.id} animeId={elem.id} image={elem.image} titleEnglish={title} type={elem.type} duration={(elem.duration !== null) ? elem.duration + 'm' : `?`} releaseDate={(elem.releaseDate !== null) ? elem.releaseDate : `?`} currentEpisode={`?`} totalEpisodes={`?`} />
                )
              })
              :
              'loading...'
            }
          </div>
        </div>
        <div className="latest-anime-container container">
          <h2 className='home-divs-top'>Latest Episode</h2>
          <InfiniteScroll dataLength={latestAnime.length} next={loadMoreLatestAnime} hasMore={hasMoreLatestAnime} loader={<img className='loader-small' src={loaderSmall} alt="loading..." />} >
            <div className="anime-container latest-episode-container">
              {(latestAnime.length !== 0) ?
                latestAnime.map((elem) => {
                  let title = '?';
                  i++;

                  if(elem.title.english !== null){
                    title = elem.title.english;
                  }
                  else if(elem.title.romaji !== null){
                    title = elem.title.romaji;
                  }
                  if (title.length > 35) {
                    title = title.slice(0, 30) + '...';
                  }

                  return (
                    <AnimeBox key={i} animeId={elem.id} epNo={elem.episodeNumber} image={elem.image} titleEnglish={title} type={elem.type} duration={`?`} releaseDate={(elem.releaseDate !== undefined && elem.releaseDate !== null) ? elem.releaseDate : `?`} currentEpisode={(elem.episodeNumber !== null) ? elem.episodeNumber : `?`} totalEpisodes={`?`} />
                  )
                })
                :
                'loading...'
              }
            </div>
          </InfiniteScroll>
        </div>
        <GoToTopButton />
      </div>
    </>
  )
}
