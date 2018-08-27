import { BirdModel } from './bird-model';
import { GetBirdsService } from './get-birds.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // Set our map properties
  mapCenter = [-78.6382, 35.7796];
  // basemapType = 'satellite';
  // basemapType = 'topo';
  basemapType = 'dark-gray';
  mapZoomLevel = 16;
  birdModel: BirdModel;

  constructor(private birdService: GetBirdsService) { }

  // See app.component.html
  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

  ngOnInit(): void {
    this.birdService.getBirds().subscribe((results) => {
      console.log('results are = ', results);
      this.birdModel = results;
      console.log('this.BirdModle = ', this.birdModel);
    });
  }
}
