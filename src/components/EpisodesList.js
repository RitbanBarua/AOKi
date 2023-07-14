import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function EpisodesList(props) {
    // const [dataLoad, setDataLoad] = useState(true)
    const animeId = useParams().animeId;
    let i = 0;
    let epNo = 0;
    let inputSearch = '';
    
    const searchEpisode = (e) => {
        inputSearch = Number.parseInt(e.target.value);
        console.log(inputSearch)
        if (1 <= inputSearch && inputSearch <= props.episodes.length && Number.isInteger(inputSearch)) {
            Array.from(document.getElementsByClassName('episodes-list-items')).forEach(element => {
                element.style.display = `none`;
            });
            document.getElementById(`episodes-list-item-${inputSearch}`).style.display = `flex`;
        }
        else {
            Array.from(document.getElementsByClassName('episodes-list-items')).forEach(element => {
                element.style.display = `flex`;
            });
        }
    }

    // Setting Active CSS

    useEffect(() => {
        if (props.episodes !== null && props.episodes.length !== 0) {
            for (let index = 1; index <= props.episodes.length; index++) {
                if (index % 2 !== 0) {
                    document.getElementById(`episodes-list-item-${index}`).style.backgroundColor = '#343a40';
                }
                else if (index % 2 === 0) {
                    document.getElementById(`episodes-list-item-${index}`).style.backgroundColor = '#202125';
                }
            }
        }
        // eslint-disable-next-line
    }, [props.dataLoading])

    useEffect(() => {
        if (props.episodes.length !== 0) {
            const list = document.getElementsByClassName("episodes-list-items");
            for (let items of list) {
                if (items.classList.contains("episode-list-active")) {
                    items.classList.remove("episode-list-active");
                }
            }
            document.getElementById(`episodes-list-item-${props.currentEpisodeIndex + 1}`).classList.add("episode-list-active");
        }
        // eslint-disable-next-line
    }, [props.dataLoading, props.currentEpisodeIndex])

    // console.log(props.dataLoading)

    return (
        <>
            <div className="container" id="episodes-list-container">
                <div id="episodes-list-top">
                    <p>List Of Episodes:</p>
                    <form action="">
                        <label htmlFor="episode-search"><i className="fa-solid fa-magnifying-glass" title='Search Episode No' style={{ color: `#ffffff` }}></i></label>
                        <input id='episode-search' placeholder='Episode No' type="number" min={1} max={props.episodes.length} onChange={searchEpisode} />
                    </form>
                </div>
                <div id="episodes-list-bottom">
                    <ol id="episodes-list">
                        {
                            (props.episodes.length !== 0) ? props.episodes.map((elem) => {
                                i++;
                                epNo++;
                                let titleEnglish = '?';
                                if (elem.title !== null && elem.title !== undefined) {
                                    titleEnglish = elem.title;
                                    if (titleEnglish.length > 25) {
                                        titleEnglish = titleEnglish.slice(0, 25) + '...';
                                    }
                                }
                                return (
                                    <Link key={epNo} to={{
                                        pathname: `/watch/${animeId}`,
                                        search: `?ep=${epNo}`, // inject code value into template
                                    }}>
                                        <li id={`episodes-list-item-${i}`} className='episodes-list-items' key={i} >
                                            <div>
                                                <span className='episode-no'>{i}.</span>
                                                <p className="episode-title">{titleEnglish}</p>
                                            </div>
                                            <i className="fa-solid fa-circle-play fa-fade" style={{ color: `#cae962` }}></i>
                                        </li></Link>
                                )
                            }) :
                                `Loading...`
                        }
                    </ol>
                </div>
            </div>
        </>
    )
}
