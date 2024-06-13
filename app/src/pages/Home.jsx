import { useState, useEffect } from 'react'
/**
 * Home page
 * 
 * This is the main landing page for the web application. 
 * Uses the Preview endpoint to display the latest preview video.
 * 
 * @author Pik Sum Siu
 */
function Home() {
    const [preview, setPreview] = useState([]);
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setPreview(json)
            setIsLoading(false)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }
    useEffect(
        () => {
            fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/preview?limit=1')
                .then(response => handleResponse(response))
                .then(json => { handleJSON(json) })
                .catch(err => { console.log(err.message); setIsLoading(false) })
        }, []
    )

    function extractVideoId(url) {
        const videoID = url.split('v=')[1];
        const videoIDPosition = videoID.indexOf('&');
        if (videoIDPosition !== -1) {
            return videoID.substring(0, videoIDPosition);
        }
        return videoID;
    }

    const previewJSX = preview.map((value, i) => {
        const videoID = extractVideoId(value.preview_video);
        const embedUrl = `https://www.youtube.com/embed/${videoID}`;

        return (
            <section key={i}>
                <h2>{value.title}</h2>
                <p><a href={value.preview_video}>{value.preview_video}</a></p>
                <iframe className='p-6 ' width="420" height="315" src={embedUrl}></iframe>
            </section>
        );
    });


    return (
        <>
            <h1 className='p-2 pb-8 m-2 text-6xl'>CHI 2023</h1>
            <section className='bg-slate-300 h-30 m-4 p-2 pb-6 rounded-md text-black flex-col md:flex-col justify-evenly'>
                <p className='p-2 text-xl'><b>Existed Research</b></p>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong</p>}
                {!isError && previewJSX}
            </section>

        </>
    )
}

export default Home