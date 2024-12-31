import {Component} from '@angular/core';
import {FindPatternsService} from '../service/find-patterns.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


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
    architectureFamily: 'CLASSIC_ARCHITECTURE', // Valore di default
    numOfResults: 5, // Numero predefinito di risultati
  };

  constructor(private findPatternsService: FindPatternsService) {
  }

  async findPatterns() {
    this.showResults = true;
    try {
      this.results = await this.findPatternsService.findPattern(this.formData);
    } catch (error) {
      console.error('Error finding patterns:', error);
      this.results = ['Error fetching patterns. Please try again later.'];
    }
  }

  reset() {
    this.showResults = false;
  }
}
