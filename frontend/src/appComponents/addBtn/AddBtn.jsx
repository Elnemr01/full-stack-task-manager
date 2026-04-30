import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const AddBtn = ({text}) => {
    return (
        <Link to={'/add-task'} state={{edit:false,data:null}}
        className='flex gap-2 items-center
        p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150 text-sm'>
            <Plus size={15}/>
            <span>{text || 'Add Task'}</span>
        </Link>
    )
}

export default AddBtn