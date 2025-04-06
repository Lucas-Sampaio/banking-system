import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { UserOutputDto } from './dto/user.dto';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(): Promise<UserOutputDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      accountNumber: user.getAccountNumber(),
    }));
  }
}
