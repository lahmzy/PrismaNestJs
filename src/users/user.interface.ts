export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface SignUpResponse {
    id:number;
    email:string;
}
