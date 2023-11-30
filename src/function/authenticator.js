import { auth } from "../database/firebase"; 
import{
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,  
    GoogleAuthProvider, 
    signInWithPopup,
} from "firebase/auth";

export const AuthMode = {
    LOG_IN : 'LOG_IN',
    SIGN_UP : 'SIGN_UP',
}
export default async function Authenticator({event, email='', password='', auth_mode = AuthMode.LOG_IN})
{
    event.preventDefault();

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
    if(auth.currentUser)
    {
        return true;
    }
    else { return false };
}

export function LogOutUser()
{
    try { auth.signOut(); localStorage.setItem("user", IsLoggedIn()); }
    catch { alert("User Not Found Try Again");  }
}


export async function SignInWithGoogle()
{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // ERR 

    await signInWithPopup(auth, provider)
        .then((result) => {
            const email = result.user.email;
            const profile = result.user.photoURL;

            localStorage.setItem("email", email);
            localStorage.setItem("profile", profile);
            

            if (window.opener) {
                window.opener.postMessage('AuthCompleted', window.location.origin);
            }
    }).catch((error) => alert("Err During Sign In"))
}

