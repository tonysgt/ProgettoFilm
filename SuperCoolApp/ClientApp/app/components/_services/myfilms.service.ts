import { User } from '../_models/user';


export class MyFilmsService {
    user: User;
    filmvisti: string[] ;
   
    getFilmID(): string[] {
        var currentUser = window.localStorage.getItem('currentUser');
        console.log(currentUser);
        if (currentUser !== null) {
            this.user = JSON.parse(currentUser) as User;
            console.log(this.user.filmVisti);
            this.filmvisti = this.user.filmVisti;
           
        }
        return this.filmvisti;  
    }
}