import React, { useState, useEffect } from 'react';
import { db } from '../database/firebase';

import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { TodoItem } from './TodoItem';

const TodoPanel = () => {

  const [data, setData] = useState([]);


  // Function to fetch data from Firebase Firestore
  const fetchData = async () => {
    const collectionRef = collection(db, "app");
    const documents = await getDocs(collectionRef);
    const data = documents.docs.map((document) => ( document.data() ));
    setData(data)
  };

  // Function to add new item
  const addItem = async () => {
    const dbRef = collection(db, "app");
    const docRef = doc(db, "app", "todo");

    const data = {
        title : "what else",
        descirption : "matter desc",
        complete : 'is complete ?'
    }
    addDoc(dbRef, data)
        .then(() => { console.log("Document has been added successfully"); })
        .catch(error => { console.log(error); })
    // setDoc(docRef, data)
    //     .then(() => { console.log("Document has been added successfully"); })
    //     .catch(error => { console.log(error); })
  };

  // Function to delete item
  const deleteItem = async id => {
   
  };

  // Function to edit item
  const editItemHandler = async () => {
  
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data])
  
  return (
        <div>
            <h1 className='dark:text-white'>CRUD App</h1>
            <button className='dark:text-white' onClick={addItem}>Add Item</button>
            {
                data.map((item, index) => (
                    <TodoItem
                        title={item.title}
                        descirption={item.descirption}
                        complete={item.complete}
                        key={index}
                     />
                ))
            }
        </div>
  );
};

export default TodoPanel;
