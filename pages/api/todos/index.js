import { getAllData, createNewData } from "@/services/serviceOperations";

export default async function handler(req, res) {
    // Disable caching
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Content-Type', 'application/json');

    try {
        if (req.method === 'GET') {
            const todos = await getAllData();
            return res.status(200).json(todos);
        }

        if (req.method === 'POST') {
            if (!req.body || !req.body.title) {
                return res.status(400).json({ error: 'Title is required' });
            }
            const todo = await createNewData(req.body);
            return res.status(201).json(todo);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
} 