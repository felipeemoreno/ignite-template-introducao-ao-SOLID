import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email, admin = false }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      admin,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const idAlreadyExists = this.users.find((user) => user.id === id);

    return idAlreadyExists;
  }

  findByEmail(email: string): User | undefined {
    const emailAlreadyExists = this.users.find((user) => user.email === email);

    return emailAlreadyExists;
  }

  turnAdmin(receivedUser: User): User {
    const user = receivedUser;

    Object.assign(user, {
      admin: true,
      updated_at: new Date(),
    });

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
