import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { ToDo } from "../db"
import moment from "moment";

interface NewToDoItemDialogProps {
    handleCreateNewItem: (event: React.MouseEvent<HTMLButtonElement>, todoItem: ToDo) => void;
}

const NewToDoItemDialog: React.FC<NewToDoItemDialogProps> = ({ handleCreateNewItem }) => {
    const [name, setName] = useState<string>("");
    const [remarks, setRemarks] = useState<string>("");
    const [targetCompleteDate, setTargetCompleteDate] = useState<Date>();
    const [status, setStatus] = useState<string>("");
    const handleCreateClick = async (event: any) => {
        try {
            const todoItem: ToDo = {
                name,
                remarks,
                targetCompleteDate,
                status
            }
            console.log(`todoItem: `, todoItem);
            handleCreateNewItem(event, todoItem);
        } catch (error) {
            console.error('Error enhancing image:', error);
            toast(`Error enhancing image: ${error}`);
        }
    };
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <div className="border border-1 rounded-lg p-2">
                        Create New Item
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] m-2 overflow-auto">
                    <DialogHeader className="container gap-2">
                        <DialogTitle>Create New Item</DialogTitle>
                        <DialogDescription className="gap-2 flex-col space-y-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Something to-do"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required
                            />
                            <Label htmlFor="remarks">Remarks</Label>
                            <Input
                                id="remarks"
                                placeholder="Remarks..."
                                value={remarks}
                                onChange={(e) => { setRemarks(e.target.value) }}
                            />
                            <Label htmlFor="targetCompleteDate">Target Complete Date</Label>
                            <Input
                                id="targetCompleteDate"
                                type="date"
                                value={moment(targetCompleteDate).format("YYYY-MM-DD")}
                                onChange={(e) => { console.log(`onChange: ${e.target.value}`); setTargetCompleteDate(new Date(e.target.value)) }}
                                required
                            />
                            <Label htmlFor="status">Status</Label>
                            <Select onValueChange={setStatus}>
                                <SelectTrigger className="w-full" id="status" value={status}>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="inProcess">In Process</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="justify-end">
                        <Button variant={"outline"} type="submit" onClick={handleCreateClick}>Create</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewToDoItemDialog;