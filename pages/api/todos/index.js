import { getAllData, createNewData } from "@/services/serviceOperations";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                const todos = await getAllData();
                return res.status(200).json(todos);

            case 'POST':
                const todo = await createNewData(req.body);
                return res.status(201).json(todo);

            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
} 