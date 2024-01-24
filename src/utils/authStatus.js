import { auth } from '../database/firebase';

export function authStatus ()
{
    const hasUser = auth.currentUser ? true : false;
    return hasUser;
}