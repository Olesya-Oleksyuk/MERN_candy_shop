import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ivan Ivanov',
    email: 'ivanivanov@mail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John Doe',
    email: 'jane@mail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
