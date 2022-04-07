// @ts-check
export default ({ opacity: searchBarOpacity, defaultValue: defaultValueOfSearch, onChange: searchOnChange }) =>
    <div className="search-bar" style={{ opacity: searchBarOpacity }}>
        <input
            type="text"
            placeholder="Search article name, tag, views, votes or author"
            defaultValue={defaultValueOfSearch}
            onKeyUp={searchOnChange}
        />
    </div>;