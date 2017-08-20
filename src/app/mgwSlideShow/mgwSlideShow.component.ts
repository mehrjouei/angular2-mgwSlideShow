// Import Component form the angular core package
import {Component , Input , OnInit} from '@angular/core';

// Import the Image interface
import {Image} from './image.interface';

// Compoent Decorator
@Component({
  //Name of our tag
  selector: 'mgwSlideShow',
  //Template for the tag
	template: `
  <div class="mgwSlideShow-container" [ngStyle]="{'height':height+(dimensiontype === 'pixel' ? 'px':'%')}">

  <div *ngFor="let image of images" [ngClass]=" image==currentSlide ? 'active mySlides fade' : 'mySlides fade'" [ngStyle]="{'background-image': 'url(' + image.url + ')'}">
    <div class="text">{{image.title}}</div>
  </div>
  <ul class="bulletList">
    <li *ngFor="let image of images" [ngClass]=" image==currentSlide ? 'active' : ''" (click)="showImage(image)"></li>
  </ul>
  <div class="timer">
    <svg class="rotate" viewbox="0 0 30 30">
      <path id="loader" [attr.d]="timerAnimation" transform="translate(15, 15)"/>
    </svg>
    <div class="dots">
      <span class="time deg0"></span>
      <span class="time deg45"></span>
      <span class="time deg90"></span>
      <span class="time deg135"></span>
    </div>
  </div>
  <span id="playPauseBtn" [ngClass]="doPlay?'play':'pause'" (click)="pausePlay()"></span>
  <a class="next" (click)="nextSlide()">&#10095;</a>
  <a class="prev" (click)="prevSlide()">&#10094;</a>
  `,
  styleUrls: ['./mgwSlideShow.component.css']
})

export class mgwSlideShowComponent {
  images = IMAGES;
  currentSlide:Image =IMAGES[0];
  currentSlideIndex:number=0;
  @Input() height:string='350';
  @Input() dimensiontype:string;
  @Input() delayTime:number=7200;
  timerAnimation:string;
  doPlay:boolean = true;
  private α = 0;
  private π = Math.PI;
  private t = (this.delayTime/360-0.1);
  private draw() {
    this.α++;
    this.α %= 360;
    let r = ( this.α * this.π / 180 )
      , x = Math.sin( r ) * 15
      , y = Math.cos( r ) * - 15
      , mid = ( this.α > 180 ) ? 1 : 0;
      this.timerAnimation = 'M 0 0 v -15 A 15 15 1 ' 
            + mid + ' 1 ' 
            +  x  + ' ' 
            +  y  + ' z';

    if(this.doPlay){
      setTimeout(()=>{ 
        if(x>-2 && x<-1 && y==-14.963460753897365){
          this.nextSlide();
        }
        this.draw();
        
      },this.t);
    }

  }
  pausePlay(){
    this.doPlay=!this.doPlay;
    if (this.doPlay){
      this.draw();
    }
  }
  showSlide(n:number) {
    if(n>this.images.length-1){
      this.currentSlide =this.images[0];
      this.currentSlideIndex=0;
    }
    else if(n<0){
      this.currentSlide =this.images[this.images.length-1];
      this.currentSlideIndex=this.images.length-1;
    }
    else{
    this.currentSlide=this.images[this.currentSlideIndex];
    }
  }

  nextSlide() {
    this.currentSlideIndex+=1;
    this.showSlide(this.currentSlideIndex);
  }
  prevSlide() {
    this.currentSlideIndex-=1;
    this.showSlide(this.currentSlideIndex);
  }
  showImage(n:Image){
    let counter:number=0;
    for(let image of this.images){
        if(n==image){
          this.currentSlide=image;
          this.currentSlideIndex=counter;
          this.showSlide(counter);
          break;
        }
        counter++;
    }
  }
  ngOnInit() {
    this.draw();
  }
}

//IMAGES array implementing Image interface
var IMAGES: Image[] = [
  { "title": "We are covered", "url": "/assets/images/slides/1.jpg" },
  { "title": "Generation Gap", "url": "/assets/images/slides/2.jpg" },
  { "title": "Potter Me", "url": "/assets/images/slides/3.jpg" },
  { "title": "Generation Gapppp", "url": "/assets/images/slides/2.jpg" }
];