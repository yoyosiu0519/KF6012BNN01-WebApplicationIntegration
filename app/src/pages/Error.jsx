import errorPic from '../assets/errorPic.jpeg'
/**
 * Error page
 * 
 * This is the error page for the web application.
 * 
 * @author Pik Sum Siu
 */
function Error() {
    return (
        <>
            <h1 className='p-2 text-6xl'>Error</h1>
            <b className='p-2 text-4xl'>404</b>
            <p className='p-2 text-xl'>Page not found</p>
            <img src={errorPic} alt="error" className="w-1/2 p-5 float-auto" />
        </>
    )
}
 
export default Error