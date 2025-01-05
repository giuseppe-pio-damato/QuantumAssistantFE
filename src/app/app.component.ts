import {Component} from '@angular/core';
import {FindPatternsService} from '../service/find-patterns.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RequestInformationDTO} from '../service/model/requestInformationDTO';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FindPatternsService],
  imports: [
    FormsModule,
    CommonModule,
  ],
  standalone: true
})
export class AppComponent {
  showResults: boolean = false;
  results: string[] = [];
  formData: any = {
    nonFunctionalRequirement: '',
    architectureFamily: '',
    numOfResults: 1,
  };

  constructor(private findPatternsService: FindPatternsService) {
  }

  get architectureFamilyEnum(): RequestInformationDTO.ArchitectureFamilyEnum {
    switch (this.formData.architectureFamily) {
      case 'classical':
        return RequestInformationDTO.ArchitectureFamilyEnum.CLASSICARCHITECTURE;
      case 'quantum':
        return RequestInformationDTO.ArchitectureFamilyEnum.QUANTUMCOMPUTING;
      default:
        return RequestInformationDTO.ArchitectureFamilyEnum.CLASSICARCHITECTURE;
    }
  }

  async findPatterns() {
    this.showResults = true;
    try {
      const formDataWithEnum = {
        ...this.formData,
        architectureFamily: this.architectureFamilyEnum,
      };
      this.results = await this.findPatternsService.findPattern(formDataWithEnum);
    } catch (error) {
      console.error('Error finding patterns:', error);
      this.results = ['Error fetching patterns. Please try again later.'];
    }
  }


  reset() {
    this.showResults = false;
  }
}
