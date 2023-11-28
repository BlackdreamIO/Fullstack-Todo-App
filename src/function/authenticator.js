import { app } from "../database/firebase"; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from "firebase/auth";

export const AuthMode = {
    LOG_IN : 'LOG_IN',
    SIGN_UP : 'SIGN_UP',
}

export default async function Authenticator({event, email='', password='', auth_mode = AuthMode.LOG_IN})
{
    event.preventDefault();
    const auth = getAuth(app);

    if(auth_mode === AuthMode.LOG_IN)
    {
        try 
        {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return user;
        } 
        catch 
        {
            return `ERR_LOG_IN`;
        }
    }
    else if (auth_mode === AuthMode.SIGN_UP)
    {
        try 
        {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return user;
        } 
        catch 
        {
            return "ERR_SIGN_UP";
        }
    }
}


export function IsLoggedIn()
{
    const auth = getAuth(app);
    auth.onAuthStateChanged(function(user) {
        return user ? true : false;
    })
}

export function LogOutUser()
{
    const auth = getAuth(app);
    auth.signOut();
}