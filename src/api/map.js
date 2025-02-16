const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const mapApi = async ( { min_lat, min_lng, max_lat, max_lng } ) => {
    const url = `${BASE_URL}/restaurants/map?min_lat=${min_lat}&min_lng=${min_lng}&max_lat=${max_lat}&max_lng=${max_lng}`
    try {
        const response = await fetch( url, { method: 'GET', } )
        if (!response.ok) {
            if (response.status === 404) {
                console.log('data: 0');
                return;
            }
            else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        }

        const data = await response.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}