import { db, auth } from '../database/firebase';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

export function CreateCollectionForUser()
{
    try 
    {
        const collectionId = `UCID : ${auth.currentUser.email}`; // <USER COLLECTION ID>

        const documents = ["ALL","IMPORTENT","COMPLETE"]; // Default Document
        const value = { docInit: "Success" }; 

        for (let i = 0; i < documents.length; i++) {
            setDoc(doc(db, collectionId, documents[i]), value); 
        }
        //setDoc(doc(db, collectionId, 'documents'), value); 
    } 
    catch (error) 
    {
        alert("Failed To Create Todo Column Try Re Sign In")
        return;    
    }
}

export async function CreateDocumentForUser({collectionRef='app', documentRef='UCID  : <USER EMAIL>', data={}})
{
    try
    {
        const dbRef = collection(db, collectionRef);

        addDoc(dbRef, data)
            .then(() => { console.log("Document has been added successfully"); })
            .catch(error => { console.log(error); })
    }
    catch (error) 
    {
        alert('Failed To Create New Column');
    }
}

export const UserDocument = {
    ID : 'id',
    DATA : 'data'
}

export async function GetUserDocuments({ GetDataOf = UserDocument.ID})
{
    const collectionRef = `UCID : ${auth.currentUser.email}`; // <USER COLLECTION ID>
    try 
    {
        const collectionID = collection(db, collectionRef);
        const documents = await getDocs(collectionID);

        if(GetDataOf === UserDocument.ID) 
        {
            const data = documents.docs.map((document) => ( document.id ));
            return data;
        }
        else if(GetDataOf === UserDocument.DATA)
        {
            const data = documents.docs.map((document) => ( document.data() ));
            return data;
        }
    } 
    catch (error) 
    {
        console.log(error);
    }
}