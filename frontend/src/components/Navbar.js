import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

const Navbar = () => {
    return(
        <header>
            <div className="container ">
                <Link to= "/">
                    <h1>STUDENT MANAGEMENT SYSTEM</h1>
                </Link>
                <Link to= "/settings">
                <SettingsIcon></SettingsIcon></Link>
            </div>
        </header>
        
    )
}

export default Navbar