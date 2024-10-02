import axios from 'axios';
import { useEffect, useState } from 'react';

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
                    setDataRequest(data[0]);
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

const CatResult = ({id, url}) => {
    return (
        <div>
            <p>Identifiant du chat : {id}</p>
            <img src={url} alt={'Image du chat : ' + id}  width={300} />
        </div>
    );
}

const CatError = ({error}) => {
    return (
        <div>Erreur : {error}</div>
    );
}

export default CatRequest;