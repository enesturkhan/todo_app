import { getDataByUnique, updateDataByAny, deleteDataByAny } from "@/services/serviceOperations";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const todo = await getDataByUnique({ id: params.id });
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching todo" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const updatedTodo = await updateDataByAny({ id: params.id }, body);
        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json({ error: "Error updating todo" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await deleteDataByAny({ id: params.id });
        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting todo" }, { status: 500 });
    }
} 