import React from 'react'
import noteContext from '../context/notes/noteContext';
export const Addnote = (props) => {

    const {addNote} = React.useContext(noteContext);
    const [note, setNote] = React.useState({ title: "", description: "",tag: "default" });
   
    const handleClick = (event) => {
        event.preventDefault();
        addNote(note);
        props.alert('success','Note Added Successfully');
    }
    const handleChange = (event) => {
        setNote({...note,[event.target.name]:event.target.value});
    }
    
    return (
        <div>
            <h3>Add Notes</h3>
            <div className="row">
                <div className="col">
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" name='title' id="title" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name='description' rows="3" onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" name='tag' id="tag" onChange={handleChange} />
                            </div>
                        <button className='btn btn-primary' onClick={handleClick}>ADD</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
