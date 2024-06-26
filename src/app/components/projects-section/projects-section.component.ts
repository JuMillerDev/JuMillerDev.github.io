import { AfterViewInit, Component, EventEmitter, HostListener, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { IconButtonComponent } from '../left-information-container/icon-button/icon-button.component';
import { borderButtonHoverAnimation } from 'src/app/animations/element-transition';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, IconButtonComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  animations: [borderButtonHoverAnimation]
})
export class ProjectsSectionComponent implements AfterViewInit{
  buttonHovered: boolean = false;
  @Output() contactInView:EventEmitter<boolean> = new EventEmitter<boolean>();
  private isContactLoaded: boolean = false;

  ngAfterViewInit(): void {
    if(typeof document !== "undefined") this.onWindowScroll();
  }

  @HostListener('window:scroll',[])
  onWindowScroll() {
    const contactSection = document.getElementById('contact');
    if (contactSection && !this.isContactLoaded) {
      const rect = contactSection.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight;
      this.contactInView.emit(isInView);
      
      if(isInView == true)
      this.isContactLoaded = !this.isContactLoaded;
    }
  }

  openGithub() {
    window.open("https://github.com/JuMillerDev", '_blank')
  }
}
