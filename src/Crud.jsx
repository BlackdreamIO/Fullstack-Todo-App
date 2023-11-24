import React, { useState, useEffect } from 'react';
import db from './database/firebase';

import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';

const CRUDApp = () => {

  const [data, setData] = useState([]);


  // Function to fetch data from Firebase Firestore
  const fetchData = async () => {
    const docRef = doc(db, "app", "todo");
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  };

  // Function to add new item
  const addItem = async () => {
   
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

  return (
      <div>
          <h1>CRUD App</h1>
          <button onClick={addItem}>Add Item</button>
      </div>
  );
};

export default CRUDApp;
