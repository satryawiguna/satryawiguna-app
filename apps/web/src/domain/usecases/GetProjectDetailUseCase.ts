import { projectRepository } from '../../data/repositories';
import type { Project } from '../entities';

/**
 * Use case: Get single project detail
 */
export class GetProjectDetailUseCase {
  async execute(id: number): Promise<Project> {
    return projectRepository.getProjectById(id);
  }
}

export const getProjectDetailUseCase = new GetProjectDetailUseCase();
