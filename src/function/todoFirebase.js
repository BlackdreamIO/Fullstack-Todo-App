import { db, auth } from '../database/firebase';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, query, where, orderBy, deleteDoc } from 'firebase/firestore';

export function CreateCollectionForUser()
{
    try 
    {
        const collectionId = `UCID : ${'mdh560354@gmail.com'}`; // <USER COLLECTION ID>

        const documents = ["ALL","IMPORTENT","COMPLETE"]; // Default Document
        const definedRandomNumber = [24, 99, 82];

        for (let i = 0; i < documents.length; i++) 
        {
            setDoc(doc(db, collectionId, documents[i]), {documentIdentity : definedRandomNumber[i]}); 
        }
    } 
    catch (error) 
    {
        alert("Failed To Create Todo Document Try Re Sign In : ", error)
        console.log(error);
        return;    
    }
}

export async function CreateDocumentForUser({collectionRef='app', data={}})
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

export async function GetSpecificTodo({documentIndexIdentity=0}) 
{
    try
    {
       const collectionRef = collection(db, `UCID : ${auth.currentUser.email}`);
       const q = await query(collectionRef, where("documentIdentity", "==", parseInt(documentIndexIdentity)));
       const documents = await getDocs(q);
       const data = documents.docs.map((document) => ( document.data() ));

       return data ? data : [];
    }
    catch 
    { 
        return []
    }
}

export async function DeleteUserDocument({documentID=''})
{
    try 
    {
        const documentReference = doc(db, `UCID : ${auth.currentUser.email}`, documentID);
        await deleteDoc(documentReference);
    } 
    catch (error) 
    {
        alert("Failed To Delete Document");
        console.log(error);
    }
}