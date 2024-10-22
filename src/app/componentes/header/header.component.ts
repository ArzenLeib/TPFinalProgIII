import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isCollapsed!: boolean; // Recibe el estado de collapsed
  @Output() toggleCollapse = new EventEmitter<void>(); // Evento para alternar

  get menuMode(): 'inline' | 'vertical' {
    return this.isCollapsed ? 'vertical' : 'inline';
  }
  
  onToggle() {
    this.toggleCollapse.emit(); 
  }
}
