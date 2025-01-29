import prisma from '@/lib/prisma';

// GET ALL
export async function getAllData() {
  try {
    const data = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// MANY POST
export async function createNewDataMany(Todo, newData) {
  try {
    const data = await prisma[Todo].createMany({ data: newData });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// POST
export async function createNewData(newData) {
  try {
    const data = await prisma.todo.create({
      data: {
        title: newData.title,
        completed: false
      }
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// GET BY UNIQUE
export async function getDataByUnique(where) {
  try {
    const data = await prisma.todo.findUnique({ where });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// GET BY UNIQUE MANY VALUE
export async function getDataByMany(Todo, where) {
  try {
    const data = await prisma[Todo].findMany({ where: where });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// UPDATE
export async function updateDataByAny(where, newData) {
  try {
    const data = await prisma.todo.update({
      where: { id: where.id },
      data: newData
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// DELETE
export async function deleteDataByAny(where) {
  try {
    const data = await prisma.todo.delete({
      where: { id: where.id }
    });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// DELETE MANY
export async function deleteDataByMany(Todo, where) {
  try {
    const data = await prisma[Todo].deleteMany({ where: where });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// DELETE ALL
export async function deleteDataAll(Todo) {
  try {
    const data = await prisma[Todo].deleteMany({});
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export default {
  getAllData,

  createNewData,
  createNewDataMany,

  getDataByUnique,

  updateDataByAny,

  deleteDataByAny,

  deleteDataByMany,

  deleteDataAll,
};
