import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() placeholder = 'Search...';
  @Input() value = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.value = value;
    this.searchChange.emit(value);
  }

  clearSearch(): void {
    this.value = '';
    this.searchChange.emit('');
  }
}

