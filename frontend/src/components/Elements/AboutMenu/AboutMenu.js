import classes from './AboutMenu.module.css';

function AboutMenu({ setToggleAbout, innerRef }) {
  const xicon = <img src="/media/icons/x.svg" alt="about menu close button" />;
  const financeIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/finance-playground-3.png"
      alt="finance playground app icon"
    />
  );
  const routesIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/renderingroutes.png"
      alt="rendering routes app icon"
    />
  );
  const pokehuntIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/pokehunt.png"
      alt="pokehunt app icon"
    />
  );
  const fairbnbIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/fairbnb.svg"
      alt="fairbnb app icon"
    />
  );
  const externalIcon = (
    <img
      className={classes.ghIcon}
      src="/static/icons/externalLink.svg"
      alt="external link icon"
    />
  );
  const mapsIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/ggcmaps.png"
      alt="ggcmaps app icon"
    />
  );
  const rarepntIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/rarepnt.svg"
      alt="rarepnt app icon"
    />
  );
  const gamevaultIcon = (
    <img
      className={classes.appIcon}
      src="/static/icons/gamevaulticon.svg"
      alt="gamevault app icon"
    />
  );
  return (
    <div className={classes.aboutMenuContainer} ref={innerRef}>
      <div className={classes.header}>
        <div className={classes.title}>
          <span>Discover More from Us</span>
        </div>
        <div
          className={classes.closeMenu}
          onClick={() => setToggleAbout(false)}
        >
          {xicon}
        </div>
      </div>
      <div className={classes.line}></div>
      <div className={classes.contributorContainer}>
        <div className={classes.contributorHeader}>
          <div className={classes.name}>Brandon Flores</div>
          <a
            className={classes.ghLink}
            href="https://github.com/brandonflores647"
            target="_blank"
            rel="noreferrer"
          >
            <span>Github {externalIcon}</span>
          </a>
        </div>
        <div className={classes.contributorIcons}>
          <a
            className={classes.appContainer}
            href="https://bflores-fairbnb.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{fairbnbIcon}</div>
              <div className={classes.appName}>Fairbnb</div>
            </div>
          </a>
          <a
            className={classes.appContainer}
            href="https://rendering-routes.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{routesIcon}</div>
              <div className={classes.appName}>Rendering Routes</div>
            </div>
          </a>
          <a
            className={classes.appContainer}
            href="https://finance-playground.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{financeIcon}</div>
              <div className={classes.appName}>Finance Playground</div>
            </div>
          </a>
        </div>
      </div>
      <div className={classes.contributorContainer}>
        <div className={classes.contributorHeader}>
          <div className={classes.name}>David Rivera</div>
          <a
            className={classes.ghLink}
            href="https://github.com/Dave89rr"
            target="_blank"
            rel="noreferrer"
          >
            <span>Github {externalIcon}</span>
          </a>
        </div>
        <div className={classes.contributorIcons}>
          <a
            className={classes.appContainer}
            href="https://rarepnt.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{rarepntIcon}</div>
              <div className={classes.appName}>RarePnT</div>
            </div>
          </a>
          <a
            className={classes.appContainer}
            href="http://ggcmaps.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{mapsIcon}</div>
              <div className={classes.appName}>GGCMaps</div>
            </div>
          </a>
          <a
            className={classes.appContainer}
            href="https://gamevault-031422.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{gamevaultIcon}</div>
              <div className={classes.appName}>GameVault</div>
            </div>
          </a>
        </div>
      </div>
      <div className={classes.contributorContainer}>
        <div className={classes.contributorHeader}>
          <div className={classes.name}>Justin Stockton</div>
          <a
            className={classes.ghLink}
            href="https://github.com/Justin-Stockton"
            target="_blank"
            rel="noreferrer"
          >
            <span>Github {externalIcon}</span>
          </a>
        </div>
        <div className={classes.contributorIcons}>
          <a
            className={classes.appContainer}
            href="https://jstockton-pokehunt.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={classes.innerAppContainer}>
              <div className={classes.appIcon}>{pokehuntIcon}</div>
              <div className={classes.appName}>PokeHunt</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutMenu;
