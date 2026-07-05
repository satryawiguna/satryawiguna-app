import { careerImpactRepository } from '../../data/repositories';

export class DeleteCareerImpactUseCase {
  async execute(id: number): Promise<void> {
    return careerImpactRepository.deleteCareerImpact(id);
  }
}

export const deleteCareerImpactUseCase = new DeleteCareerImpactUseCase();
