import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { logout } from '../../../store/session';
import { actionLogoutWorkspace } from '../../../store/workspaces';

import classes from './Footer.module.css';

const Footer = ({ user }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogout = async () => {
        await dispatch(actionLogoutWorkspace());
        await dispatch(logout());
        history.push("/");
    }

    return (
        <div className={classes.footerContainer}>
            <section className={classes.footerTop}>
                <div className={classes.footerTopLogoWrap}>
                    <img
                      className={classes.icon}
                      src="/static/icons/stakr-logo-white.svg"
                      alt="stakr logo"
                    />
                    {user?
                        <span onClick={onLogout}>{'Log Out'}</span> :
                        <NavLink to='/login'>Log In</NavLink>
                    }
                </div>
                <div className={classes.personContainer}>
                    <p>David Rivera</p>
                    <span>
                        <a href='https://www.google.com'>
                            <span className={classes.logoTitle}>
                                Linkedin
                                <img className={classes.img} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt='linkedin logo'/>
                            </span>
                        </a>
                        <a href='https://www.google.com'>
                            <span className={classes.logoTitle}>
                                Github
                                <img className={classes.img} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt='github logo'/>
                            </span>
                        </a>
                    </span>
                </div>
                <div className={classes.personContainer}>
                    <p>Brandon Flores</p>
                    <span>
                        <a href='https://www.linkedin.com/in/brandon-flores-798b98239' target='_blank' rel="noreferrer">
                        <span className={classes.logoTitle}>
                            Linkedin
                            <img className={classes.img} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt='linkedin logo'/>
                        </span>
                        </a>
                        <a href='https://github.com/brandonflores647' target='_black' rel='noreferrer'>
                        <span className={classes.logoTitle}>
                            Github
                            <img className={classes.img} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt='github logo'/>
                        </span>
                        </a>
                    </span>
                </div>
                <div className={classes.personContainer}>
                    <p>Justin Stockton</p>
                    <span>
                        <a href='https://www.google.com'>
                        <span className={classes.logoTitle}>
                            Linkedin
                            <img className={classes.img} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt='linkedin logo'/>
                        </span>
                        </a>
                        <a href='https://www.google.com'>
                        <span className={classes.logoTitle}>
                            Github
                            <img className={classes.img} src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt='github logo'/>
                        </span>
                        </a>
                    </span>
                </div>
            </section>
            <section className={classes.footerBottom}>
                <span>Copyright © 2022 Stakr</span>
                <span>Trello Clone</span>
            </section>
        </div>
    );
}

export default Footer;
