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
        const response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Fetch Error:', error);
        return { error: error.message };
    }
}

export async function postAPI(endpoint, body, method = 'POST') {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Fetch Error:', error);
        return { error: error.message };
    }
} 