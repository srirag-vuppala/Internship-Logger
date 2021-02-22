import '../assets/SearchButton.css'
import SearchBar from './SearchBar'

function SearchButton() {
    return (
        <div className="search-button">
            <input
            type="button"
            value="Search"
            />
        </div>
    )
}

export default SearchButton