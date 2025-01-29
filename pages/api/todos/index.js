import { getAllData, createNewData } from "@/services/serviceOperations";

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

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const todos = await getAllData();
                if (todos.error) {
                    return res.status(500).json({ error: todos.error });
                }
                res.status(200).json(todos);
            } catch (error) {
                res.status(500).json({ error: "Error fetching todos" });
            }
            break;

        case "POST":
            try {
                const todo = await createNewData(req.body);
                if (todo.error) {
                    return res.status(500).json({ error: todo.error });
                }
                res.status(201).json(todo);
            } catch (error) {
                res.status(500).json({ error: "Error creating todo" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
} 