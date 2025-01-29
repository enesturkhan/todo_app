const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

async function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Invalid content type: ${contentType}`);
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'API request failed');
    }
    return data;
}

export async function getAPI(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return { error: error.message };
    }
}

export async function postAPI(endpoint, body, method = 'POST') {
    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return { error: error.message };
    }
} 