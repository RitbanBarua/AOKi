import React from 'react'
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';


export default function VidStack(props) {
    const { link, vidTitle } = props;
    return (
        <>
            <MediaPlayer
                title={vidTitle}
                src={link}
                // poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
                // thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
                aspectRatio={16 / 9}
                crossorigin=""
            >
                <MediaOutlet>
                    <MediaPoster
                        alt={vidTitle}
                    />
                    {/* <track
                        src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
                        label="English"
                        srcLang="en-US"
                        kind="subtitles"
                        default
                    />
                    <track
                        src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
                        srcLang="en-US"
                        kind="chapters"
                        default
                    /> */}
                </MediaOutlet>
                <MediaCommunitySkin />
            </MediaPlayer>
        </>
    )
}
