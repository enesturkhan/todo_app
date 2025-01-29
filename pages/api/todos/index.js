import { getAllData, createNewData } from "@/services/serviceOperations";

export default async function handler(req, res) {
    // Set CORS and content type headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    try {
        switch (req.method) {
            case 'GET':
                const todos = await getAllData();
                return res.status(200).json(todos);

            case 'POST':
                const todo = await createNewData(req.body);
                return res.status(201).json(todo);

            case 'OPTIONS':
                return res.status(200).end();

            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
} 