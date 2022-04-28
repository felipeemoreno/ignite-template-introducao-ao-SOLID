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
      throw new Error("User not found");
    }

    if (userIdExists.admin === false) {
      throw new Error("User isn't an admin");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
