import {
    getDataByUnique,
    updateDataByAny,
    deleteDataByAny,
} from "@/services/serviceOperations";

export default async function handler(req, res) {
    // Set CORS and content type headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.query;

    try {
        switch (req.method) {
            case 'GET':
                const todo = await getDataByUnique({ id });
                if (!todo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }
                return res.status(200).json(todo);

            case 'PUT':
                const updatedTodo = await updateDataByAny({ id }, req.body);
                return res.status(200).json(updatedTodo);

            case 'DELETE':
                await deleteDataByAny({ id });
                return res.status(200).json({ success: true });

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