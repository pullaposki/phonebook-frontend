const Search = (props) => {
    
    
    return (
        <div>
            search <input onChange={(event)=>props.handleSearchChange(event)} value={props.searchValue} />
        </div>
    );
}

export default Search;