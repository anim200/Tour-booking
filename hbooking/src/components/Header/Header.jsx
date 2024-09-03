import { Button, Container, Row } from 'reactstrap';
import { NavLink, Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import './header.css';
import { useEffect, useRef } from 'react';
import logo from "../../assets/images/logo.png"
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';


const nav_links = [
    { path: '/home', display: 'Home' },
    { path: '/about', display: 'About' },
    { path: '/tours', display: 'Tours' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate=useNavigate();
  const {user,dispatch}=useContext(AuthContext);

  const logout=()=>{
    dispatch({type:'LOGOUT'})
    navigate('/')
  }

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (window.scrollY > 120) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    };

    window.addEventListener('scroll', stickyHeaderFunc);
    
    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, []);
   const toggleMenu = () => menuRef.current.classList.toggle('show_menu')
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" style={{ maxHeight: '120px', width: 'auto' }} />
            </div>
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink className={({ isActive }) => isActive ? 'active_link' : ''} to={item.path}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {
                  user? <>
                  <h5 className='mb-0'>{user.username}</h5>
                  <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                  </>:<>
                  <button className="btn secondary_btn">
                  <Link className='link' to="/login">Login</Link>
                </button>
                <button className="btn primary_btn">
                  <Link to="/register" className='link'>Register</Link>
                </button>
                  </>
                }
               
              </div>
              <span className="mobile_menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;



