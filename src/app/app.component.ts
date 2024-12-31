import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(10px)'}),
        animate('500ms ease-out', style({opacity: 1, transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({opacity: 0, transform: 'translateY(10px)'})),
      ]),
    ]),
  ],
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class AppComponent {
  title = 'QuantumAssistantFE';
  showResults = false; // Determina se mostrare i risultati o il form
  formData: any = {}; // Dati del form
  results: string[] = []; // Risultati simulati

  // Simulazione della chiamata al backend
  findPatterns() {
    this.showResults = true;
    this.results = [
      'Pattern 1: Singleton - Ensures a single instance.',
      'Pattern 2: Factory - Creates objects without specifying the exact class.',
      'Pattern 3: Observer - Notifies changes to multiple subscribers.',
    ];
  }

  reset() {
    this.showResults = false;
    this.formData = {};
    this.results = [];
  }
}
