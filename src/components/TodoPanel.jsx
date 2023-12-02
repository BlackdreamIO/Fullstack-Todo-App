import React, { useState, useEffect } from 'react';
import { db, auth } from '../database/firebase';

import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { CreateCollectionForUser, CreateDocumentForUser, UserDocument, GetUserDocuments } from '../function/todoFirebase';

import TodoColumnPanel from './TodoColumnPanel';
import TodoListPanel from './TodoListPanel';

export default function TodoPanel() 
{

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



  const addDocument = async () => { 
 
    CreateCollectionForUser();

    //CreateDocumentForUser({
    //   collectionRef:`UCID : ${auth.currentUser.email}`,
    //   data:{
    //     title : "First Todo",
    //     complete : "pending",
    //     descirption : "lorem ipsul dole"
    //   },
    //   documentRef:"auto generated document"
    // });

    //const data = await GetUserDocuments({collectionRef:`UCID : ${auth.currentUser.email}`,GetDataOf:GetDocument.DATA});
    //console.log(data);
  }

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div className='flex flex-row items-center justify-center'>
        <TodoColumnPanel/>
        <TodoListPanel/>
    </div>
  )
}

