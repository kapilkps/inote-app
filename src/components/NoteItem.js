import React from 'react'
import noteContext from '../context/notes/noteContext'

export const NoteItem = (props) => {
    const {deleteNote} = React.useContext(noteContext);
    const {_id,title,description}= props.note;
    return (
        <div className='col-3'>
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">
                {title}
                </h5>
                <div className="card-text">
                {description}
                </div>
                <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(_id);props.alertShow('success','Note Deleted Successfully')}}></i>
                <i className="fa-solid fa-edit" onClick={()=>{props.updateModalNote(props.note)}}></i>
            </div>
        </div>
        </div>
    )
}
