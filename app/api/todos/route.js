import { getAllData, createNewData } from "@/services/serviceOperations";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const todos = await getAllData();
        if (todos.error) {
            return NextResponse.json({ error: todos.error }, { status: 500 });
        }
        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching todos" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const todo = await createNewData(body);
        if (todo.error) {
            return NextResponse.json({ error: todo.error }, { status: 500 });
        }
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error creating todo" }, { status: 500 });
    }
} 