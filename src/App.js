import { lazy, Suspense } from 'react';
import './App.css';
const Search = lazy(() => import('./components/Search'));

function App() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <div className="App">
        <header className="App-header">
          <h2>
            React + RxJS + testing-library
        </h2>
        </header>
        <section className="App-section">
          <Search />
        </section>
      </div>
    </Suspense>
  );
}

export default App;
