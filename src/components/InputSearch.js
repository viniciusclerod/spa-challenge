import './InputSearch.css';

const InputSearch = ({ loading, onChange }) => {
    return (
        <>
            <div className="InputSearch">
                <input type="search"
                    data-testid="input"
                    placeholder="Buscar..."
                    onChange={onChange}
                />
                {loading && (
                    <span className="suffix">
                        <i className="loader"
                            data-testid="loader"></i>
                    </span>
                )}
            </div>
        </>
    );
}

export default InputSearch;