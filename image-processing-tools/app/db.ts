// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface ToDo {
    id?: number;
    name: string;
    remarks?: string;
    targetCompleteDate?: Date;
    status: string;
}

const db = new Dexie('FriendsDatabase') as Dexie & {
    todos: EntityTable<
        ToDo,
        'id' // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
db.version(1).stores({
    todos: '++id, name, remarks, targetCompleteDate, status' // primary key "id" (for the runtime!)
});

export type { ToDo };
export { db };