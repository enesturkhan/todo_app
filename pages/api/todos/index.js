import { getAllData, createNewData } from "@/services/serviceOperations";

export const config = {
    api: {
        bodyParser: true,
        externalResolver: true,
    },
};

export default async function handler(req, res) {
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
    }

    // Set headers for all responses
    res.setHeader('Content-Type', 'application/json');

    try {
        switch (req.method) {
            case 'GET':
                const todos = await getAllData();
                if (!Array.isArray(todos)) {
                    throw new Error('Invalid response format');
                }
                return res.status(200).json(todos);

            case 'POST':
                if (!req.body || !req.body.title) {
                    return res.status(400).json({ error: 'Title is required' });
                }
                const todo = await createNewData(req.body);
                if (!todo || !todo.id) {
                    throw new Error('Invalid todo creation response');
                }
                return res.status(201).json(todo);

            default:
                return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
} 