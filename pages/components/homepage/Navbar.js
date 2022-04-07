// @ts-check
export default ({ authorized: Csession }) =>
    <nav id="nav">
        {/*Navbar buttons*/}
        <div style={{ display: 'flex' }} id="nav_button">
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
            <div className="create" id="sign">{Csession ? "PROFILE" : "SIGN UP"}</div>
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
                    borderStyle: 'solid', borderWidth: '5px', height: '36px'
                }}>
                <i className="fa fa-search" style={{
                    backgroundColor: 'transparent', color: 'white', fontSize: '16px'
                }}></i>
            </button>
        </div>
    </nav>