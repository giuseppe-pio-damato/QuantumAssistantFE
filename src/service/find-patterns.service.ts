import { Injectable } from '@angular/core';
import { SuggestPatternControllerImplService } from './api';
import { RequestInformationDTO } from './model/requestInformationDTO';

@Injectable({
  providedIn: 'root',
})
export class FindPatternsService {
  constructor(private client: SuggestPatternControllerImplService) {}

  /**
   * Fetches suggested patterns based on the provided form data.
   * @param formData - Input data from the form.
   * @returns A promise containing the suggested patterns as a key-value object.
   */
  async findPattern(formData: {
    nonFunctionalRequirement: string;
    architectureFamily: string;
    numOfResults: number;
  }): Promise<{ [key: string]: string }> {
    try {
      // Map form data to RequestInformationDTO
      const requestBody = this.mapToRequestDTO(formData);

      // Call the suggestPattern API
      const response = await this.client.suggestPattern(requestBody).toPromise();

      return response || {};
    } catch (error) {
      console.error('Error fetching suggested patterns:', error);
      throw new Error('Failed to fetch suggested patterns. Please try again later.');
    }
  }

  /**
   * Maps form data to a RequestInformationDTO object.
   * @param formData - Input data from the form.
   * @returns Mapped RequestInformationDTO object.
   */
  private mapToRequestDTO(formData: {
    nonFunctionalRequirement: string;
    architectureFamily: string;
    numOfResults: number;
  }): RequestInformationDTO {
    return <RequestInformationDTO>{
      nonFunctionalRequirement: formData.nonFunctionalRequirement,
      architectureFamily: formData.architectureFamily,
      numOfResults: formData.numOfResults,
    };
  }
}
