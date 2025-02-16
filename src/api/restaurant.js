const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const restaurantApi = async ( {id} ) => {
    const url = `${BASE_URL}/restaurants/${id}`
    try {
        const response = await fetch( url, { method: 'GET', } )
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}