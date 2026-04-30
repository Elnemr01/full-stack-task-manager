import {Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import AddBtn from '../addBtn/AddBtn'

const Empty = () => {
    return (
        <div className="min-h-[50vh] flex flex-col justify-center items-center gap-3 mt-10">
            <span className='text-xl font-semibold capitalize'>No tasks</span>
            <AddBtn text="Add Your First Task"/>
        </div>
    )
}

export default Empty