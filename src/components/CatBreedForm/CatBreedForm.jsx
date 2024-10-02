import { useId } from 'react';
import { useForm } from 'react-hook-form';

const CatBreedForm = ({ onSearch = () => {} }) => {

    const inputId = useId();
    const { register, handleSubmit, reset, setFocus } = useForm({
        defaultValues : { query: '' }
    });

    const handleCatBreedSubmit = (data) => {
        console.log('CatBreedSubmit', data);

        // Envoi des données vers le composant parent
        onSearch(data.query);

        // Utilisation de la librairie pour mettre le focus sur l'element
        // NB : La méthode "setFocus" doit être utiliser avant le "reset"
        setFocus('query');

        // Utilisation de la librairie pour reset le formulaire
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleCatBreedSubmit)}>
            <label htmlFor={inputId}>Race de chat recherchée : </label>
            <input id={inputId} type='text' {...register('query')} />
            <button type='submit'>Rechercher</button>
        </form>
    );
};

export default CatBreedForm;