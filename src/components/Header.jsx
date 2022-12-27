import logo from '../icons/logo.svg'
import reset from '../icons/reset.svg'
import './styles/Header.css'

const Header = () => {
    return (
        <div className='Header'>
            <div className='logo-wrapper'>
                <img className='logo' alt='logo' src={logo}></img>
                <div className='header-title'>Memory Card Game</div>
            </div>
            <div className='button-wrapper'>
                <img className='restart-button' alt='restart button' src={reset}></img>
            </div>
        </div>
    );
}

export default Header;
