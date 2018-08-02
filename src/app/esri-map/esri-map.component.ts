/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { GetBirdsService } from '../get-birds.service';
import { BirdModel } from '../bird-model';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  
  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap: string = 'streets';
  private _id = '8f1baa9422a941d4a02779aeb6716fa3';
  birdModel: BirdModel;

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor(private birdService: GetBirdsService) { }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, EsriSceneView, WebMap] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/views/SceneView',
        'esri/WebMap'
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // const webmap: esri.WebMap = new WebMap({
      //   portalItem: { // autocasts as new PortalItem()
      //     id: '8f1baa9422a941d4a02779aeb6716fa3' // waze
      //     // id: 'bf8b11ed78454c72bceaf6502e80c563' // birds
      //   },
      // });

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        // map: web
        map: map
      };

      // const mapView: esri.MapView = new EsriMapView(mapViewProperties);
      const sceneView: esri.SceneView = new EsriSceneView(mapViewProperties);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
    //   mapView.when(() => {
    //     this.mapLoaded.emit(true);
    //   });
    // } catch (error) {
    //   console.log('We have an error: ' + error);
    // }

    sceneView.when(() => {
      this.mapLoaded.emit(true);
    });
  } catch (error) {
    console.log('We have an error: ' + error);
  }

}

addPoints(): any {
  this.birdService.getBirds().subscribe((results) => {
    console.log('results are = ', results);
    this.birdModel = results;
    console.log('this.BirdModle = ', this.birdModel);
  });
}

ngOnInit() {
  this.initializeMap();
  this.addPoints();
}

}
