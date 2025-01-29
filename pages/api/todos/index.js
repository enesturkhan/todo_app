import { getAllData, createNewData } from "@/services/serviceOperations";

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req, res) {
    // Set JSON content type
    res.setHeader('Content-Type', 'application/json');

    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    try {
        switch (req.method) {
            case 'GET':
                const todos = await getAllData();
                console.log('GET /api/todos response:', todos); // Debug için
                return res.status(200).json(todos);

            case 'POST':
                const todo = await createNewData(req.body);
                console.log('POST /api/todos response:', todo); // Debug için
                return res.status(201).json(todo);

            default:
                return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
} 