import { getAllData, createNewData } from "@/services/serviceOperations";

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
        res.status(200).end();
        return;
    }

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const todos = await getAllData();
                if (todos.error) {
                    return res.status(500).json({ error: todos.error });
                }
                return res.status(200).json(todos);
            } catch (error) {
                return res.status(500).json({ error: "Error fetching todos" });
            }

        case "POST":
            try {
                const todo = await createNewData(req.body);
                if (todo.error) {
                    return res.status(500).json({ error: todo.error });
                }
                return res.status(201).json(todo);
            } catch (error) {
                return res.status(500).json({ error: "Error creating todo" });
            }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
} 