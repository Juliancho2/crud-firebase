import React, { useEffect, useState } from 'react'
import firebaseApp from '../credentials';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, setDoc, getDocs } from 'firebase/firestore';


const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const initialValue = {
    name: "",
    age: "",
    profession: ""
}

const Home = ({ user }) => {
    const [userAdd, setUserAdd] = useState(initialValue);
    const [list, setList] = useState([]);
    const [subId, setSubId] = useState('');

    useEffect(() => {
        const getList = async () => {
            try {
                const querySnapShot = await getDocs(collection(db, 'usuarios'));
                const docs = [];
                querySnapShot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                setList(docs);
            } catch (err) {

            };

        };
        getList();

    }, [list.length]);


    const handleLogOut = () => signOut(auth);

    const handleChangeInputs = (e) => {
        setUserAdd({
            ...userAdd,
            [e.target.name]: e.target.value
        });
    };
    const handleSaveData = async (e) => {
        e.preventDefault();
        try {
            if (subId !== '') {
                await setDoc(doc(db, 'usuarios', subId), {
                    ...userAdd
                });
                setSubId('');
            }
            else {
                await addDoc(collection(db, 'usuarios'), {
                    ...userAdd
                });
                setList((prev) => prev.concat(userAdd));
            }
        } catch (error) {
            0
            console.log(error)
        }

        setUserAdd(initialValue);
    }
    const handleDeleteDoc = async (id) => {
        try {
            await deleteDoc(doc(db, "usuarios", id));
            const newList = list.filter(doc => doc.id !== id);
            setList(newList);
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateDoc = (id) => {
        const docToUpdate = list.find(item => item.id === id);

        setUserAdd(docToUpdate);
        setSubId(id)
    }
    const handleClear = () => {
        setSubId('');
        setUserAdd(initialValue);
    }


    return (
        <div className='container'>
            <p>Welcome <strong>{user}</strong> You are logded in.</p>
            <button className='btn btn-primary' onClick={handleLogOut}>Log out</button>
            <hr />
            <div className='row'>
                <div className="col-md-4">
                    <h3>Get into</h3>
                    <form onSubmit={handleSaveData}>
                        <div className='card card-body'>
                            <div className='form-group'>
                                <input autoComplete='current-name' value={userAdd.name} onChange={handleChangeInputs} type="text" name='name' className='form-control my-1' placeholder='enter username' />

                                <input autoComplete='current-age' value={userAdd.age} onChange={handleChangeInputs} type="number" name='age' className='form-control my-1' placeholder='enter age' />

                                <input autoComplete='current-profession' value={userAdd.profession} onChange={handleChangeInputs} type="text" name='profession' className='form-control my-1' placeholder='enter profession' />

                            </div>
                            <div className='d-flex gap-5'>
                                <button type='submit' className='btn btn-primary w-50'>
                                    {
                                        subId.length > 0 ? 'Update' : 'Save'
                                    }
                                </button>
                                <button type='button' onClick={handleClear} className='btn btn-primary  w-50'>
                                    Clear
                                </button>
                            </div>

                        </div>
                    </form>

                </div>
                <div className="col-md-8">
                    <h3>List of users</h3>
                    <div className="card">
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Profession</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.length > 0 && (
                                        list.map(doc => (
                                            <tr key={doc.id}>
                                                <th scope="row">{doc.id}</th>
                                                <td>{doc?.name}</td>
                                                <td>{doc?.age}</td>
                                                <td>{doc?.profession}</td>
                                                <td >
                                                    <button className='btn btn-danger mx-2' onClick={() => handleDeleteDoc(doc.id)}>Delete</button>
                                                    <button className='btn btn-primary mx-2' onClick={() => handleUpdateDoc(doc.id)}>Update</button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }

                            </tbody>
                        </table>
                    </div>



                </div>

            </div>
        </div >
    )
}

export default Home
