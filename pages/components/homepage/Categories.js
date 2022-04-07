// @ts-check
export default ({ authorized: Csession }) =>
    <div id="sort">
        {(() => {
            /**
             * @type {React.MouseEventHandler<HTMLDivElement>}
             */
            const collectionRedirect = e => {
                const id = e.currentTarget.id;

                if (id !== location.pathname) {
                    sessionStorage.setItem("scroll", window.scrollY.toString());
                    location.href = `${id}`;
                }
            }

            /**
             * @type {{[url: string]: { header: string, requireAuth: boolean }}}
             */
            const obj = {
                article: {
                    header: "Discover",
                    requireAuth: false
                },
                mostvote: {
                    header: "Most Voted",
                    requireAuth: false
                },
                myarticle: {
                    header: "My Articles",
                    requireAuth: true
                },
                otherarticle: {
                    header: "Other Articles",
                    requireAuth: true
                },
                collaborated: {
                    header: "Collaborated Articles",
                    requireAuth: true
                }
            };

            const result = [];

            for (const urlName in obj)
                // If require auth and Csession is defined
                if (
                    !obj[urlName].requireAuth
                    || (obj[urlName].requireAuth && Csession)
                )
                    // Add the item
                    result.push(
                        <div
                            className="list"
                            id={`/${urlName}`}
                            key={urlName}
                            onClick={collectionRedirect}
                        >{obj[urlName].header}</div>
                    );
            return result;
        })()}
    </div>