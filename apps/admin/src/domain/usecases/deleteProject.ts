import { projectRepository } from '../../data/repositories';

export class DeleteProjectUseCase {
  async execute(id: number): Promise<void> {
    return projectRepository.deleteProject(id);
  }
}

export const deleteProjectUseCase = new DeleteProjectUseCase();
