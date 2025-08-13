"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { db, ToDo } from "../db";
import NewToDoItemDialog from "./NewItemDialog";

export default function ToDoList() {
    /**
    // Using IndexedDB
    useEffect(() => {
        const dbName = "todo-list-db";
        const request = indexedDB.open(dbName, 2);
        request.onerror = (event) => {
            // Handle errors.
            toast(`Fail to use IndexedDB ${event.target?.error?.message}`)
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("todo", { keyPath: "ssn" });
            objectStore.createIndex("name", "name", { unique: false });

            objectStore.transaction.oncomplete = (event) => {
                // Store values in the newly created objectStore.
                const customerObjectStore = db
                    .transaction("customers", "readwrite")
                    .objectStore("customers");
                customerData.forEach((customer) => {
                    customerObjectStore.add(customer);
                });
            };
        };
    }, []) 
    */
    const [todoList, setTodoList] = useState<ToDo[]>([]);
    const todos = useLiveQuery(() => db.todos?.toArray());
    useEffect(() => {
        if (todos) {
            setTodoList(todos);
        }
    }, [todos]);

    async function addToDoItem(todoItem: ToDo) {
        try {
            // let todoItem: ToDo;
            // todoItem = {
            //     id: 1,
            //     name: "",
            //     remarks: "",
            //     targetCompleteDate: new Date(),
            //     status: ""
            // }
            console.log("db.todos: ", db.todos, db)
            const id = await db.todos.add(todoItem);
            toast(`Item added to To-Do List.`);
        } catch (error) {
            toast(`Failed to add item: ${error}`);
        }
    }

    const handleAddItem = async (event: any, todoItem: ToDo) => {
        try {
            addToDoItem(todoItem);
        } catch (error) {
            console.error('Error enhancing image:', error);
            toast(`Error enhancing image: ${error}`);
        }
    };

    return (
        <>
            <div className="items-end text-end">
                <NewToDoItemDialog handleCreateNewItem={handleAddItem} />
            </div>
            <Table>
                <TableCaption>A To-Do List using IndexedDB</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Remarks</TableHead>
                        <TableHead>Target Complete Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todoList && todoList.length > 0 ? todoList.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.remarks || ""}</TableCell>
                            <TableCell>{moment(item.targetCompleteDate).format("YYYY/MM/DD") || ""}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <Button variant={"outline"} onClick={(event) => { db.todos.delete(item.id) }}>
                                    Delete Item
                                </Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No records</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}