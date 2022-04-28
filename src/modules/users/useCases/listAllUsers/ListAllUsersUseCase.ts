import AppError from "../../../../error/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userIdExists = this.usersRepository.findById(user_id);

    if (!userIdExists) {
      throw new AppError("User not found", 404);
    }

    if (userIdExists.admin === false) {
      throw new AppError(
        "You need to be an administrator to list all users.",
        400
      );
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
