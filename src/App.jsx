import { useState } from 'react';
import './App.css'
import CatBreedForm from './components/CatBreedForm/CatBreedForm';
import CatRequest from './components/CatRequest/CatRequest';

function App() {

  const [catBreed, setCatBreed] = useState(null);

  const handleCatSearch = (breed) => {
    setCatBreed(breed);
  };

  return (
    <>
      <h1>Demo requete Ajax</h1>
      <CatBreedForm onSearch={handleCatSearch} />
      {catBreed && (
        <CatRequest breed={catBreed} />
      )}
    </>
  )
}

export default App
