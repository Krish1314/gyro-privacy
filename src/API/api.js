export const fetchProtectedData = async (token) => {
    try {
        const response = await fetch('/api/protected-data', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch protected data');
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
