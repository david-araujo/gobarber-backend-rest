import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar', 401);

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(avatarFilePath);

      if (userAvatarExists) await fs.promises.unlink(avatarFilePath);
    }
    user.avatar = avatarFilename;

    await this.usersRepository.update(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
