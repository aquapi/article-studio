// @ts-check
export default ({ authorized: Csession, setFade, display }) =>
    <nav id="nav" style={{ zIndex: display }}>
        {/*Navbar buttons*/}
        <div style={{ display: 'flex' }} id="nav_button">
            {/*New article*/}
            {Csession
                // New article
                ? <div
                    className="create"
                    id="new"
                    onClick={
                        () => location.href = "/article/new"
                    }>NEW</div>
                : <></>
            }

            {/*Sign up or profile*/}
            <div className="create" id="sign" onClick={() => {
                // Redirect to sign up page or profile page
                location.href = Csession ? "/profile" : "/signup";
            }}>{Csession ? "PROFILE" : "SIGN UP"}</div>

            {/*Login*/}
            {!Csession
                ? <div
                    className="create"
                    id="login"
                    onClick={
                        () => {
                            sessionStorage.setItem("prevLocation", location.pathname);
                            location.href = "/login";
                        }
                    }>LOGIN</div>
                : <></>
            }
        </div>
        {/*Navbar search icon*/}
        <div className="input">
            <button
                style={{
                    margin: '0px', backgroundColor: 'transparent !important', borderColor: 'transparent',
                    borderStyle: 'solid', borderWidth: '5px', height: '36px', zIndex: 5
                }}
                onClick={setFade}>
                <i className="fa fa-search" style={{
                    backgroundColor: 'transparent', color: 'white', fontSize: '16px'
                }}></i>
            </button>
        </div>
    </nav>