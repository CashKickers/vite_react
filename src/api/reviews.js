const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const reviewsApi = async ( {id} ) => {
    const url = `${BASE_URL}/reviews/${id}`
    try {
        const response = await fetch( url, { method: 'GET', } )
        if (!response.ok) {
            if (response.status === 404) {
                console.log('No Review Summary');
                return [];
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