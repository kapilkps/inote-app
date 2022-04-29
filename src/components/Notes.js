import React from 'react'
import noteContext from '../context/notes/noteContext';
import { NoteItem } from './NoteItem';


export const Notes = (props) => {
    const { notes, getNotes, updateNote } = React.useContext(noteContext);
    const [note, setnote] = React.useState({ title: '', description: '', tag: '' });
    const [id, setid] = React.useState(null);
    React.useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const modal = React.useRef(null);
    const modal_close = React.useRef(null);
    const updateNoteModal = (note) => {
        setnote({ title: note.title, description: note.description, tag: note.tag });
        setid(note._id);
        modal.current.click();
    }
    const handleClick = (event) => {
        updateNote(id, note);
        modal_close.current.click();
        props.alert('success','Updated Successfully');
    }
    const handleChange = (event) => {
        setnote({ ...note, [event.target.name]: event.target.value });
    }
    return (
        <div>
            <h3>Notes</h3>
            {/* modal */}
            <button type="button" ref={modal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="mtitle" className="form-label">Title</label>
                                <input type="text" className="form-control" name='title' id="mtitle" value={note.title} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mdescription" className="form-label">Description</label>
                                <textarea className="form-control" id="mdescription" name='description' rows="3" value={note.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mtag" className="form-label">Tag</label>
                                <input type="text" className="form-control" name='tag' id="mtag" value={note.tag} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={modal_close} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            <div className='row'>
                {notes.map((value) => {
                    return <NoteItem key={value._id} updateModalNote={updateNoteModal} alertShow={props.alert} note={value}></NoteItem>
                })}
            </div>
        </div>

    )
}
