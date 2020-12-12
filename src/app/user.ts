export class user {
    
    constructor
    (
   public id: string,
   public name: string,
   public username: string,
   public password: string,
   public email: string,
   public phone: number = null,
   public image: string = null,
   public bio: string = null,
   public token: string,
){}

}