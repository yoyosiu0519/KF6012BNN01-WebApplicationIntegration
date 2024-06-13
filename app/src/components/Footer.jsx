import { useState, useEffect } from 'react'
/**
 * Footer component
 * 
 * This component displays developer information in the footer using the Developer endpoint.
 * 
 * 
 * @author Pik Sum Siu
 */

function Footer() {
    const [studentDetails, setStudentDetails] = useState([]);
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
        if (json.constructor === Object) {
            setStudentDetails([json]);
            setIsLoading(false);
        } else {
            throw new Error("invalid JSON: " + json);
        }
    }
    useEffect(
        () => {
            fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/developer')
                .then(response => handleResponse(response))
                .then(json => { handleJSON(json) })
                .catch(err => { console.log(err.message); setIsLoading(false) })
        }, []
    )

    const studentJSX = studentDetails.map((value, i) =>
        <section key={i} className='px-3'>
            <p>{value.name}</p>
            <p>{value.id}</p>
        </section>
    )

    return (
        <div className='pt-8'>
            <footer className="flex flex-col md:flex-col justify-evenly bg-gray-800 pt-4">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong</p>}
                <p className='px-3 py-1'>Student Details:</p>
                {!isError && studentJSX}
                <p className='px-3 pb-4'>Coursework assignmenet for KF6012 Web Application Integration, Northumbria University</p>
                {/* You can add more content here as needed */}
            </footer>

        </div>

    );
}

export default Footer;