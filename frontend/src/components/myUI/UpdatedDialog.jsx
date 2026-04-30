import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const UpdatedDialog = ({children,message,fun,loading}) => {
    return (
            <Dialog>
            <DialogTrigger asChild>
            <Button variant="outline shadow-none p-0 m-0">{children}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm flex items-center justify-center flex-col text-center bg-white ">
            <DialogHeader>
                <DialogTitle className={'font-semibold text-xl'}>Confirm Action</DialogTitle>
                <DialogDescription className={'text-lg'}>
                {message|| 'Are you sure you want to proceed with this action?'}
                </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={fun} className={'text-white bg-red-500 hover:bg-red-600'}>
                {loading ? 'Processing...' : 'Confirm'}
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdatedDialog