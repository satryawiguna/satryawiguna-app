import { educationService } from 'shared-api';
import type {
  EducationListResponse,
  EducationDetailResponse,
  EducationMutationResponse,
  EducationQueryParams,
  CreateEducationRequest,
  UpdateEducationRequest,
} from 'shared-types';

export class EducationRepository {
  async getEducations(params?: EducationQueryParams): Promise<EducationListResponse> {
    return educationService.getEducations(params);
  }

  async getEducationById(id: number): Promise<EducationDetailResponse> {
    return educationService.getEducationById(id);
  }

  async createEducation(data: CreateEducationRequest): Promise<EducationMutationResponse> {
    return educationService.createEducation(data);
  }

  async updateEducation(
    id: number,
    data: UpdateEducationRequest
  ): Promise<EducationMutationResponse> {
    return educationService.updateEducation(id, data);
  }

  async deleteEducation(id: number): Promise<void> {
    return educationService.deleteEducation(id);
  }
}

export const educationRepository = new EducationRepository();
