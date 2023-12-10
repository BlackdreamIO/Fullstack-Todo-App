import { db, auth } from '../database/firebase';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, query, where, orderBy, deleteDoc } from 'firebase/firestore';


export const UserDocument = {
    ID : 'id',
    DATA : 'data'
}

export function CreateCollectionForUser() // @ CCFU
{
    try 
    {
        const collectionRef = `UCID : ${auth.currentUser.email}`; // <USER COLLECTION ID>

        const documents = ["ALL","IMPORTENT","COMPLETE"]; // Default Document
        const definedRandomNumber = [24, 99, 82];

        for (let i = 0; i < documents.length; i++) 
        {
            setDoc(doc(db, collectionRef, documents[i]), {documentIdentity : definedRandomNumber[i]}); 
        }
    } 
    catch (error) 
    {
        alert("Failed To Create Todo Document Try Re Sign In : ", error)
        console.log(error);
        return;    
    }
}

export async function CreateDocumentForUser({documentName=''}) // @ CDFU
{
    try
    {
        const collectionRef = `UCID : ${auth.currentUser.email}`; // <USER COLLECTION ID>
        const trimmedDocumentID = documentName.trim();

        if(trimmedDocumentID.length === 3 || trimmedDocumentID.length < 3) { alert("Document Length Must Be Greater Then 3"); return; }
        
        const docRef = doc(db, collectionRef, trimmedDocumentID);

        setDoc(docRef, {documentIdentity:Math.floor(Math.random() * 16)})
            .then(() => { console.log("Document has been added successfully"); })
            .catch(error => { console.log(error); })
    }
    catch (error) 
    {
        alert('Failed To Create New Column');
    }
}

export async function GetUserDocuments({ GetDataOf = UserDocument.ID}) // @ GUD
{
    try 
    {
        const collectionRef = `UCID : ${auth.currentUser.email}`; // <USER COLLECTION ID>
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

export async function GetSpecificTodo({documentIndexIdentity=0}) // @ DST
{
    try
    {
        const collectionRef = `UCID : ${auth.currentUser.email}`; // <USER COLLECTION ID>
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

export async function DeleteUserDocument({documentID=''}) // @ DUD
{
    try 
    {
        await GetUserDocuments({GetDataOf:UserDocument.ID})
            .then((response) => {
                if(response.length > 1)
                {
                    const documentReference = doc(db, `UCID : ${auth.currentUser.email}`, documentID);
                    deleteDoc(documentReference);
                }
                else{
                    alert("You Cant Delete This Document ! There Must Be Atleast 1 Document Left");
                }
            })
            .catch((error) => console.log("err during deleteting document"))
    } 
    catch (error) 
    {
        alert("Failed To Delete Document");
        console.log(error);
    }
}