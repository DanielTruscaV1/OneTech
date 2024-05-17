const Landing = () => {
  return (
    <div 
      id="landing-container"
    >
      <h1 id="landing-title">
        OneTech
      </h1>
      <button id="landing-menu">
        <img src="/landing4.png"/>
      </button>
      <h1 id="landing-motto">
        <span>
          The
        </span>
        &nbsp;
        <span>
        ever-evolving
        </span>
        <br/>
        &nbsp;
        <span>
        online
        </span>
        &nbsp;
        <span>
        tech 
        </span>
        &nbsp;
        <span>
        community
        </span>
        !
      </h1>
      <div id="landing-images-container">
        <div className="landing-card">
          <img src="/landingC1.jpg"/>
        </div>
        <div className="landing-card">
          <img src="/landingC2.jpg"/>
        </div>
        <div className="landing-card">
          <img src="/landingC3.jpg"/>
        </div>
        <div className="landing-card">
          <img src="/landingC4.jpg"/>
        </div>
      </div>
      <div id="landing-social-container">
        <button>
          <img src="/landingB1.png"/>
        </button>
        <button>
          <img src="/landingB2.png"/>
        </button>
        <button>
          <img src="/landingB3.png"/>
        </button>
        <button>
          <img src="/landingB4.png"/>
        </button>
        <button>
          <img src="/landingB5.png"/>
        </button>
      </div>
      <h3 id="landing-note">
        © OneTech 2024 Copyright
      </h3>
    </div>
  )
}

export default Landing