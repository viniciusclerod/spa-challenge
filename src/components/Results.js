const Results = ({ data = [], noResults = false }) => {
    return (
        <div data-testid="results">
            { noResults && <p data-testid="no-results">Sem resultados para essa busca</p>}
            <ul>
                {!noResults && data.map(({ id, first_name, last_name }) =>
                    <li key={id} data-testid="item">
                        {`${first_name} ${last_name}`}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Results;
