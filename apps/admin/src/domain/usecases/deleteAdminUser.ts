import { adminUserRepository } from '../../data/repositories';

export class DeleteAdminUserUseCase {
  async execute(id: number): Promise<void> {
    return adminUserRepository.deleteUser(id);
  }
}

export const deleteAdminUserUseCase = new DeleteAdminUserUseCase();
