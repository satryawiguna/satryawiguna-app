import { careerImpactService } from 'shared-api';
import type {
  CareerImpactListResponse,
  CareerImpactDetailResponse,
  CareerImpactMutationResponse,
  CareerImpactQueryParams,
  CreateCareerImpactRequest,
  UpdateCareerImpactRequest,
} from 'shared-types';

export class CareerImpactRepository {
  async getCareerImpacts(params?: CareerImpactQueryParams): Promise<CareerImpactListResponse> {
    return careerImpactService.getCareerImpacts(params);
  }

  async getCareerImpactById(id: number): Promise<CareerImpactDetailResponse> {
    return careerImpactService.getCareerImpactById(id);
  }

  async createCareerImpact(data: CreateCareerImpactRequest): Promise<CareerImpactMutationResponse> {
    return careerImpactService.createCareerImpact(data);
  }

  async updateCareerImpact(
    id: number,
    data: UpdateCareerImpactRequest,
  ): Promise<CareerImpactMutationResponse> {
    return careerImpactService.updateCareerImpact(id, data);
  }

  async deleteCareerImpact(id: number): Promise<void> {
    return careerImpactService.deleteCareerImpact(id);
  }
}

export const careerImpactRepository = new CareerImpactRepository();
