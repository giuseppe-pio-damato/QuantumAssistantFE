import { Component } from '@angular/core';
import { FindPatternsService } from '../service/find-patterns.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestInformationDTO } from '../service/model/requestInformationDTO';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgxPaginationModule} from 'ngx-pagination';

interface FormData {
  nonFunctionalRequirement: string;
  architectureFamily: string;
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
    trigger('flip', [
      state(
        'form',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
      state(
        'results',
        style({
          transform: 'rotateY(360deg)',
        })
      ),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  standalone: true,
})
export class AppComponent {
  p: number = 1;
  showResults = false;
  showBox = false;
  results: { [key: string]: string } = {};
  formData: FormData = {
    nonFunctionalRequirement: '',
    architectureFamily: '',
    numOfResults: 1,
  };

  constructor(private findPatternsService: FindPatternsService) {}

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

  get objectKeys() {
    return Object.keys;
  }

  get getSize() {
    return Object.length;
  }

  async findPatterns() {
    this.showResults = true;
    this.showBox = true;
    try {
      const requestBody: RequestInformationDTO = {
        ...this.formData,
        architectureFamily: this.architectureFamilyEnum,
      };

      this.results = await this.findPatternsService.findPattern(requestBody);
    } catch (error) {
      console.error('Error finding patterns:', error);
      this.results = { 'Error': 'Failed to fetch patterns. Please try again later.' };
    }
  }

  reset() {
    this.showResults = false;
    this.showBox = false;
    this.formData = {
      nonFunctionalRequirement: '',
      architectureFamily: '',
      numOfResults: 1,
    };
    this.results = {};
  }
}
