import { tagRepository } from '../../data/repositories';

export class DeleteTagUseCase {
  async execute(id: number): Promise<void> {
    return tagRepository.deleteTag(id);
  }
}

export const deleteTagUseCase = new DeleteTagUseCase();
