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
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Network response was not ok');
        }

        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
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
            next: { revalidate: 0 }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Network response was not ok');
        }

        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
} 