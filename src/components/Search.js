import { lazy, Suspense, useEffect, useState } from "react";
import useDebounceInput from "../hooks/useDebounceInput";
import UserService from "../services/UserService";
const InputSearch = lazy(() => import('./InputSearch'));
const Results = lazy(() => import('./Results'));

const Search = () => {

  const [terms, setTerms] = useDebounceInput(800, "");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleSearch = async (value) => {
      try {
        setLoading(true);
        if (value) {
          const data = await UserService.search(value);
          setData(data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    handleSearch(terms);
    return null;
  }, [terms]);

  return (
    <div data-testid="search">
      <Suspense fallback={<>...</>}>
        <InputSearch
          loading={loading}
          onChange={setTerms}
        />
      </Suspense>
      <Suspense fallback={<>...</>}>
        <Results
          noResults={!loading && !!terms && !data.length}
          data={data}
        />
      </Suspense>
    </div>
  );

}

export default Search;