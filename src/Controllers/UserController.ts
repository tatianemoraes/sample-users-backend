import { Request, Response } from 'express';
import users from '../Model/Users';

class UserController {
  async index(request: Request, response: Response) {
    try {
      const data = await users.find();
      return response.json(data);
    } catch (error) {
      return response.json({ message: 'users not found' });
    }
  }

  async indexById(request: Request, response: Response) {
    const { id } = request.params;
    let data;
    try {
      data = await users.findById({ _id: id });
      console.log(data);

      // vem um array de objetos
      // const data = await users.find({ _id: id });

      // vem objeto
      // const data = await users.findOne({ _id: id });
    } catch (error) {
      if (error) {
        return response.json({ message: 'this user does not exist' });
      }
    }
    return response.json(data);
  }

  async indexByEmail(request: Request, response: Response) {
    const { email } = request.query;
    let data;
    try {
      data = await users.findOne({ email });
    } catch (error) {
      if (error) {
        return response.json({ message: 'this user does not exist' });
      }
    }
    return response.json(data);
  }

  async create(request: Request, response: Response) {
    const { name, email, password, nickname } = request.body;

    const userExists = await users.findOne({ email, nickname });
    if (userExists) {
      return response.status(400).json({ message: 'This user already exists' });
    }

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ message: 'Email is required' });
    }

    if (!password) {
      return response.status(400).json({ message: 'Password is required' });
    }

    if (!nickname) {
      return response.status(400).json({ message: 'Nickname is required' });
    }

    const data = await users.create(request.body);
    return response
      .status(201)
      .json({ message: 'User has been creates', data });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const idExists = await users.findById({ _id: id });

    if (!idExists) {
      return response.status(400).json({ message: 'User does not exist' });
    }

    await users.findByIdAndDelete({ _id: id });
    const listUsers = await users.find();
    return response.json(listUsers);
  }

  async update(request: Request, response: Response) {
    const { email, nickname } = request.body;
    const { id } = request.params;

    const userExists = await users.findById({ _id: id });

    if (!userExists) {
      return response.status(400).json({ message: 'User does not exist' });
    }

    if (email !== userExists.email) {
      const emailExists = await users.findOne({ email });
      if (emailExists) {
        return response.json({
          message: 'This email does not be used, because it is already in use',
        });
      }
    }

    if (nickname !== userExists.nickname) {
      const nicknameExists = await users.findOne({ nickname });
      if (nicknameExists) {
        return response.json({
          message:
            'This nickname does not be used, because it is already in use',
        });
      }
    }

    const updateUser = await users.findByIdAndUpdate(
      { _id: id },
      { $set: request.body },
      { new: true },
    );
    return response.json({ message: 'User has been updated', updateUser });
  }
}

export default new UserController();
