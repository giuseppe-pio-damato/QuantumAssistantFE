import { Injectable } from '@angular/core';
import { SuggestPatternControllerImplService } from './api/suggestPatternControllerImpl.service';
import { RequestInformationDTO } from './model/requestInformationDTO';

@Injectable({
  providedIn: 'root',
})
export class FindPatternsService {
  constructor(private client: SuggestPatternControllerImplService) {}

  async findPattern(formData: any): Promise<string[]> {
    try {
      // Convert formData to RequestInformationDTO
      const requestBody: RequestInformationDTO = this.mapToRequestDTO(formData);

      // Call the suggestPattern API
      const response = await this.client.suggestPattern(requestBody).toPromise();

      return response || [];
    } catch (error) {
      console.error('Error fetching patterns:', error);
      throw error;
    }
  }

  private mapToRequestDTO(formData: any): RequestInformationDTO {
    return {
      nonFunctionalRequirement: formData.nonFunctionalRequirement,
      architectureFamily: formData.architectureFamily,
      numOfResults: formData.numOfResults,
    };
  }
}
