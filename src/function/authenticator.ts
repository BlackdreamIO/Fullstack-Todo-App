import db from '../database/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential} from "firebase/auth";

export enum AuthMode 
{
    LOG_IN = 'LOG_IN',
    SIGN_UP = 'SIGN_UP',
}

export default async function Authenticator({event, email='', password='', auth_mode = AuthMode.LOG_IN} : { event: any, email?: string, password?: string, auth_mode?: AuthMode }) : Promise<void>
{
    event.preventDefault();
    let auth : any = db;
    if(auth_mode === AuthMode.LOG_IN)
    {
        try 
        {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            //const user = userCredential.user;
        } 
        catch 
        {
            //return this."ERR_WRONG_INFO";
            //reject(new Error('Name is missing')); 
        }
    }
    else if (auth_mode === AuthMode.SIGN_UP)
    {
        try 
        {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        } 
        catch 
        {
            //return "ERR_WRONG_INFO";
        }
    }
}
