import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@root.com',
    password: bcrypt.hashSync('root', 10),
    isAdmin: true,
  },
  {
    name: 'Suraz Kc',
    email: 'surazkc@root.com',
    password: bcrypt.hashSync('root', 10),
  },
  {
    name: 'Uttam Kc',
    email: 'uttamkc@root.com',
    password: bcrypt.hashSync('root', 10),
  },
];

export default users;
