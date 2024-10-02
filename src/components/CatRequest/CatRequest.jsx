import axios from 'axios';
import { useEffect, useState } from 'react';
import './CatRequest.css';

const CatRequest = ({ breed }) => {

    const [isLoading, setLoading] = useState(false);
    const [dataRequest, setDataRequest] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Avant de lancer la requete Ajax -> Set des valeurs
        setLoading(true);
        setDataRequest(null);
        setError(null);

        // Requete Ajax (via axios)
        axios.get('https://api.thecatapi.com/v1/images/search', {
            params: {
                breed_ids: breed,
                has_breeds: true,
                api_key: import.meta.env.VITE_CAT_API_KEY
            }
            })
            .then(({ data }) => {
                console.log(data);
                if(data.length >= 1) {
                    const cat = data[0];
                    setDataRequest({
                        id: cat.id,
                        name: cat.breeds.map(b => b.name).join(' / '),
                        urlImage: cat.url,
                        altImage: `Cat image for ${cat.id}`
                    });
                }
                else {
                    setError('Po de chat 😿')
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });

    }, [breed]);

    return (
        <>
            {isLoading ? (
                <CatLoading />
            ) : dataRequest ? (
                <CatResult {...dataRequest} />
            ) : error && (
                <CatError error={error} />
            )}
        </>
    );
};

const CatLoading = () => {
    return (
        <div>Chargement du chat en cours...</div>
    )
}

const CatResult = ({id, urlImage, altImage, name}) => {
    return (
        <div className='cat_result'>
            <p>{name} <span>(Id : {id})</span></p>
            <img src={urlImage} alt={altImage} />
        </div>
    );
}

const CatError = ({error}) => {
    return (
        <div>Erreur : {error}</div>
    );
}

export default CatRequest;