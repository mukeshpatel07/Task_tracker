import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()
        navigate('/signup');
    }

    return (
        <div className='nav-container'>
           

            {auth ? <ul className='nav-ul '>
                <div className='nav-left'>
                <li > <Link to="/" >Projects</Link></li>
                <li> <Link to="/add-project" >New Project</Link></li>
                {/* <li> <Link to="/logout" >Log out</Link></li> */}
                {/* <li> <Link to="/profile" >Profile</Link></li> */}
                </div>
                <div className='nav-ul'>
                <li className='profile'><Link to="/profile">{JSON.parse(auth).name}</Link></li>
                <li><Link onClick={logout} to="/login">Log out</Link></li>
                
                {/* <li>{auth?<Link  onClick={logout} to="/signup">Log out</Link>: <Link to="/signup" >Sign up</Link>}</li>
                <li><Link to="login">Login</Link></li> */}
                </div>

            </ul> :
                <ul className='nav-ul'>
                    {/* <li> <Link to="/signup" >Sign up</Link></li> */}
                    <li><Link to="signup">SignUp</Link></li>
                </ul>
            }

        </div>
    )

}
export default Nav;