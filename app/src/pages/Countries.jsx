import { useState, useEffect } from 'react'
import countriesPic from '../assets/countriesPic.jpg'
/**
 * Countries page
 * 
 * This page displays listed countries in the affiliation table. 
 * A serach bar is provided to search for a specific country.
 * It uses the Country endpoint.
 * 
 * @author Pik Sum Siu
 */
function Countries() {
    const [country, setCountry] = useState([]);
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setCountry(json)
            setIsLoading(false)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }
    useEffect(
        () => {
            fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/country')
                .then(response => handleResponse(response))
                .then(json => { handleJSON(json) })
                .catch(err => { console.log(err.message); setIsLoading(false) })
        }, []
    )

    const handleSearch = (event) => { setSearch(event.target.value) }

    const searchCountry = (country) => country.country.toLowerCase().includes(search.toLowerCase())
 
    const countryJSX = country.filter(searchCountry).map((value, i) =>
        <section key={i}>
            <h3 className='bg-white h-30 overflow-auto m-4 p-2 rounded-md text-black'>{value.country}</h3>
            
        </section>
    )

    return (
        <>
            <h1 className='p-2 text-6xl'>Country Affiliation Overview</h1>
            <img src={countriesPic} alt="countries" className="w-1/3 p-5 float-auto" />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}
            <form className='p-5 text-black'>
                <input value={search} onChange={handleSearch} placeholder='search' className='p-1 mx-2 rounded-md'/>
            </form>
            <div className= "grid md:grid-cols-2 lg:grid-cols-4">
            {!isError && countryJSX}
            </div>
            
        </>
    )
}
 
export default Countries