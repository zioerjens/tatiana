import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ApplicationStateService } from '../application-state.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  animations: [
    trigger('openClose', [
      state('open', 
      style({maxHeight: '{{max_height}}',
        }), {params: {max_height: '200px'}}),
      state('closed', style({
        maxHeight: '0'
      })),
      transition('* => *', animate('0.5s ease-out'))
    ]),
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [ApplicationStateService],
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('navigationContainer') navigationContainer : ElementRef;
  @ViewChild('firstNavigationItem') firstNavigationItem : ElementRef;
  @ViewChild('languageSelector', { read: ElementRef }) languageSelector : ElementRef;
  @Input() maxHeight: string = '200px';
  
  public desiredMarginTopDistance = "0px";

  constructor(
    public applicationStateService: ApplicationStateService,
    private renderer: Renderer2
    ) { }
  
  isOpen = false;
  
  ngOnInit() : void {
    if(!this.applicationStateService.getIsMobileResolution()) {
      this.isOpen = true;
    }
  }

  ngAfterViewInit(): void  {
    setTimeout(() => {
      var navigationHeight = this.navigationContainer.nativeElement.scrollHeight;
      var firstNavigationItemHeight = this.firstNavigationItem.nativeElement.scrollHeight;
      var desiredMarginTop = 0 - firstNavigationItemHeight;
      this.desiredMarginTopDistance = desiredMarginTop.toString() + "px";
      this.maxHeight =  navigationHeight.toString() + "px";
      }, 0)
  }

  toggleNavigation() {
    this.isOpen = !this.isOpen;
  }

  getAnimationStatus() {
    return this.isOpen? 'open' : 'closed';
  }
}
