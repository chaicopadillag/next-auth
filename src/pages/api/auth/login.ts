import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../database/bd';
const loginHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Solicitud no válida',
    });
  }
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({
      message: 'Usuario o contraseña incorrectos',
    });
  }

  res.json(user);
};

export default loginHandler;
