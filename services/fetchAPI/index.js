const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAPI(endpoint) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error: error.message };
    }
}

export async function postAPI(endpoint, body, method = 'POST') {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error: error.message };
    }
} 