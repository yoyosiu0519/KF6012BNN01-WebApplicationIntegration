import { useState, useEffect } from 'react'
import ContentDetail from '../components/ContentDetail'
import SearchContentType from '../components/SearchContentType'
/**
 * Content page
 * 
 * 
 * This page should show title of research contents. Click on the title to view the detail of the content.
 * The page should show blocks of 20 items of content at a time, 
 * with the ability to navigate to further or previous blocks of content.
 * There's a ‘select’ component that allows the user to filter the content by type.
 * It uses the Content endpoint.
 * 
 * @author Pik Sum Siu
 */
console

function Content(props) {
    const [content, setContent] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [selectType, setSelectType] = useState('')

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setContent(json)
            setIsLoading(false)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }
    useEffect(() => {
        const params = new URLSearchParams({
          page: page.toString(),
        });
      
        if (selectType !== '' && selectType !== 'All') {
          params.append('type', selectType);
        }
        fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/content?' + params.toString())
          .then(response => handleResponse(response))
          .then(json => { handleJSON(json) })
          .catch(err => { console.log(err.message); setIsLoading(false) })
      }, [page, selectType]);

      const selectContentType = (content) => {
        if (selectType === '' || selectType === 'All') {
          return true;
        } else {
          return content.type === selectType;
        }
      }

    let contentJSX = content.filter(selectContentType).map((content, index) =>
        <div key={index}>
            <ContentDetail 
                content={content} 
                signedIn={props.signedIn}                 
                save={props.save} 
                setSave={props.setSave}/>
        </div>
    )

    const handleSelectType = (event) => {
        setSelectType(event.target.value)
    }

    if (contentJSX.length === 0 && !isLoading) {
        contentJSX = <p>No content found</p>
    }

    const lastPage = (contentJSX.length === 0)
    const firstPage = (page <= 1)

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const previousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const prevDisabled = (firstPage) ? 'disabled' : ''
    const nextDisabled = (lastPage) ? 'disabled' : ''


    return (
        <>
            <h1 className='p-2 text-6xl'>Content</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}
            <SearchContentType selectType={selectType} handleSelectType={handleSelectType} className='p-1 mx-2 rounded-md' />
            <div className="grid grid-cols-1">{!isError && contentJSX}</div>
            
            <button onClick={previousPage } disabled={prevDisabled} className="py-1 px-2 mx-2 bg-gray-800 hover:bg-gray-700 rounded-md">Previous</button>
            <button onClick={nextPage} disabled={nextDisabled} className="py-1 px-2 mx-2 bg-gray-800 hover:bg-gray-700 rounded-md">Next</button>
        </>
    )
}

export default Content