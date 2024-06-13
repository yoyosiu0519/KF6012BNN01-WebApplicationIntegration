import { Link } from 'react-router-dom';

/**
 * Navigation menu component
 * 
 * This is the main navigation component in provides links to all pages
 * 
 * @author Pik Sum Siu
 */
function NavMenu() {

    const menuItems = ["Home", "Countries", "Content"]
    const menuJSX = menuItems.map(
        (item, i) => <li key={i} className="pb-4 hover:bg-gray-500">{item}</li>
    )

    return (
        <nav className="bg-gray-800">
            <ul className="flex flex-col md:flex-row justify-evenly">
                <li className="pb-4 hover:bg-gray-500"><Link to="/">Home</Link></li>
                <li className="pb-4 hover:bg-gray-500"><Link to="/countries">Countries</Link></li>
                <li className="pb-4 hover:bg-gray-500"><Link to="/content">Content</Link></li>
            </ul>

        </nav>

    )
}

export default NavMenu;
