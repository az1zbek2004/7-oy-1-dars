import React, { useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './style.module.css'
import { Alert } from '@mui/material';

function Home() {
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState('Error'); 
    const [books, setBooks] = useState(localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [])
    const name = useRef();
    const author = useRef();
    const desc = useRef();
    const username = JSON.parse(localStorage.getItem('username'));
    let counter = 1;

    function validate(name, author) {
        if (!name.current.value.trim()) {
           name.current.focus();
           setError(true);
           setAlert('Enter book name!') 
        }
        if (!author.current.value.trim()) {
           author.current.focus();
           setError(true);
           setAlert('Enter author name!') 
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        let copied = JSON.parse(JSON.stringify(books))
        const isValid = validate(name, author);
        if (isValid) {
            setError(false);
            setAlert('') 
            const book = {
                username:username,
                id:Date.now(),
                name:name.current.value,
                author:author.current.value,
                desc:desc.current.value
            }
            copied.push(book);
            localStorage.setItem('books', JSON.stringify(copied))
            setBooks(copied)
            name.current.value = '';
            author.current.value = '';
            desc.current.value = '';
        }
    }

    function handleDelete(id) {
        const isConfirm = confirm("Rostdan ham o'chirmoqchimisiz?");
        if (isConfirm) {
            let copied = JSON.parse(JSON.stringify(books))
            copied = copied.filter(el => {
                return el.id != id;
            })
            setBooks(copied);
            localStorage.setItem('books', JSON.stringify(copied))
        }

    }

  return (
    <div>
         <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>books</h1>
                {
                    error &&
                    <Alert sx={{ marginBottom: '15px' }} severity="error">{alert}</Alert>
                }
                <div className="form-floating mb-3">
                    <input ref={name} type="text" className="form-control" id="floatingInput" placeholder="Name" />
                    <label htmlFor="floatingInput">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input ref={author} type="text" className="form-control" id="floatingInput" placeholder="Author" />
                    <label htmlFor="floatingInput">Author</label>
                </div>

                <div class="form-floating">
                    <textarea ref={desc} class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea">Comments</label>
                </div>
                
                <button className='btn btn-primary w-100 mt-3 fs-5'>Add book</button>
            </form>

            <table className={`table table-striped ${styles.table}`}>
                <thead>
                    <tr>
                        <th className='th'>N%</th>
                        <th className='th'>Book name</th>
                        <th className='th'>Book author</th>
                        <th className='th'>About book</th>
                        <th className='th'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        books && books.map((el, index) => {
                            return (
                              el.username == username &&  <tr key={index}>
                                    <td>{counter++}</td>
                                    <td>{el.name}</td>
                                    <td>{el.author}</td>
                                    <td>{el.desc}</td>
                                    <td>
                                        <DeleteIcon onClick={() => {handleDelete(el.id)}} sx={{marginRight: '10px', cursor: 'pointer'}}></DeleteIcon>
                                        <EditIcon sx={{cursor: 'pointer'}}></EditIcon>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    </div>
  )
}

export default Home