import {
    getDataByUnique,
    updateDataByAny,
    deleteDataByAny,
} from "@/services/serviceOperations";

export default async function handler(req, res) {
    // Set JSON content type
    res.setHeader('Content-Type', 'application/json');

    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Accept, Content-Type'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).json({});
        return;
    }

    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const todo = await getDataByUnique({ id });
                if (!todo) {
                    return res.status(404).json({ error: "Todo not found" });
                }
                return res.status(200).json(todo);
            } catch (error) {
                return res.status(500).json({ error: "Error fetching todo" });
            }

        case "PUT":
            try {
                const updatedTodo = await updateDataByAny({ id }, req.body);
                return res.status(200).json(updatedTodo);
            } catch (error) {
                return res.status(500).json({ error: "Error updating todo" });
            }

        case "DELETE":
            try {
                await deleteDataByAny({ id });
                return res.status(200).json({ message: "Todo deleted successfully" });
            } catch (error) {
                return res.status(500).json({ error: "Error deleting todo" });
            }

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
} 