import {
    getDataByUnique,
    updateDataByAny,
    deleteDataByAny,
} from "@/services/serviceOperations";

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
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
                res.status(200).json(todo);
            } catch (error) {
                res.status(500).json({ error: "Error fetching todo" });
            }
            break;

        case "PUT":
            try {
                const updatedTodo = await updateDataByAny({ id }, req.body);
                res.status(200).json(updatedTodo);
            } catch (error) {
                res.status(500).json({ error: "Error updating todo" });
            }
            break;

        case "DELETE":
            try {
                await deleteDataByAny({ id });
                res.status(200).json({ message: "Todo deleted successfully" });
            } catch (error) {
                res.status(500).json({ error: "Error deleting todo" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
} 