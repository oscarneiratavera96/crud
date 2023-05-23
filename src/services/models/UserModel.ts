export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verification: {
    email: boolean;
  };
}
