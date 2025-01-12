import {Component} from '@angular/core';
import {FindPatternsService} from '../service/find-patterns.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RequestInformationDTO} from '../service/model/requestInformationDTO';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import NonFunctionalRequirementEnum = RequestInformationDTO.NonFunctionalRequirementEnum;
import ArchitectureFamilyEnum = RequestInformationDTO.ArchitectureFamilyEnum;

interface FormData {
  nonFunctionalRequirement: string;
  architectureFamily: string;
  nonFunctionalRequirementRate: number;
  numOfResults: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FindPatternsService],
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('0.5s ease-out', style({opacity: 1, transform: 'translateY(0)'})),
      ]),
    ]),
  ],
  standalone: true,
})
export class AppComponent {
  p: number = 1;
  showResults = false;
  showDescription = false;
  showHelp = false;
  results: { [key: string]: string } = {};
  formData: FormData = {
    nonFunctionalRequirement: '',
    architectureFamily: '',
    nonFunctionalRequirementRate: 1,
    numOfResults: 1,
  };

  nonFunctionalRequirements = Object.entries(NonFunctionalRequirementEnum).map(([key, value]) => ({
    value: value,
    label: value.toLowerCase().replace(/_/g, ' '),
  }));

  architectureFamilies = Object.entries(ArchitectureFamilyEnum).map(([key, value]) => ({
    value: value,
    label: value.toLowerCase().replace(/_/g, ' '),
  }));


  constructor(private findPatternsService: FindPatternsService) {
  }

  get objectKeys() {
    return Object.keys;
  }

  get getSize() {
    return Object.length;
  }

  async findPatterns() {
    this.showResults = true;
    try {
      this.results = await this.findPatternsService.findPattern(this.formData);
    } catch (error) {
      console.error('Error finding patterns:', error);
      this.results = {'Error': 'Failed to fetch patterns. Please try again later.'};
    }
  }

  reset() {
    this.showResults = false;
    this.formData = {
      nonFunctionalRequirement: '',
      architectureFamily: '',
      nonFunctionalRequirementRate: 1,
      numOfResults: 1,
    };
    this.results = {};
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  moreDetails() {
    this.showDescription = !this.showDescription;
  }

}
