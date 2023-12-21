export interface User {
  name?: string;
  email?: string;
  image?: string;
  isAdmin?: string;
  }

export interface Users {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password?: string;
  isManager?: string;
  status?: string;
  manager?: string;
  isAdmin?: string;
  id?: string;
}

export interface Departments {
  name?: string;
  status: string;
  manager: string;
  id?: string;
}

export interface userFormData {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password?: string;
  isManager?: string;
  status?: string;
  manager?: string;
  id?: string;
}

export interface MenuItem {
  title: string;
  list: {
    title: string;
    path: string;
    icon: JSX.Element;
  }[];
}

