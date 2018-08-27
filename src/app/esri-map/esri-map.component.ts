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
  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = 'streets';
  private _id = '8f1baa9422a941d4a02779aeb6716fa3';
  birdModel: BirdModel;
  map: esri.Map;
  sceneView: esri.SceneView;

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
      const [EsriMap, EsriMapView, EsriSceneView, WebMap, Graphic, GraphicsLayer, FeatureLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/views/SceneView',
        'esri/WebMap',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/layers/FeatureLayer'
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
        ground: 'world-elevation'
      };

      this.map = new EsriMap(mapProperties);

      // const webmap: esri.WebMap = new WebMap({
      //   portalItem: { // autocasts as new PortalItem()
      //     id: '8f1baa9422a941d4a02779aeb6716fa3' // waze
      //     // id: 'bf8b11ed78454c72bceaf6502e80c563' // birds
      //   },
      // });

      // Raleigh
      const point = {
        type: 'point', // autocasts as new Point()
        x: -78.6382,
        y: 35.7796,
        z: 510
      };

      const markerSymbol = {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      const graphicsLayer = new GraphicsLayer();
      this.map.add(graphicsLayer);

      graphicsLayer.add(pointGraphic);

      const sceneViewProperties: esri.SceneViewProperties = {
        container: this.mapViewEl.nativeElement,
        map: this.map,
        camera: { // autocasts as new Camera()
          position: { // autocasts as new Point()
            x: -78.6382,
            y: 35.7796,
            z: 1266.7049653716385
          },
          heading: 0.34445102566290225,
          tilt: 82.95536300536367
        }
      };


      const polyline = {
        type: 'polyline', // autocasts as new Polyline()
        paths: [
          [-78.6382, 35.7796, 0],
          [-78.6382, 35.7796, 500]
        ]
      };

      const lineSymbol = {
        type: 'simple-line', // autocasts as SimpleLineSymbol()
        color: [226, 119, 40],
        width: 4
      };

      const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: lineSymbol
      });

      graphicsLayer.add(polylineGraphic);


      // Create the FeatureLayer using the popupTemplate
      // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=featurelayerview-query
      const featureLayer = new FeatureLayer({
        // url: 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/bird_scooter_locations/FeatureServer/0?token=y6q96RydSw0BkNQNAYi4whuIMntMPX7ctk2NiuqYQGjAkwvCtp_fe2_Yw-attw2b0QjssMrjr60L8zpTgf5R7BxsENy-Hld4fdVKq6uZ40hNYLMRsDLGYHwNTHasAO_oVq2Hc5XGsu5OSoeQPdmJ_ALfbSCCO7UU3DDznX7KP79Z9IVxjkPBo2fOh8f3kAlNxxqy0-G7y-Ywdp5anKEJll911nEMR_OgdzHgoMh706gEm-UFtqOVMQsKHpUzC65I',
        url: 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/bird_scooter_locations/FeatureServer/0?token=0mu6YHENOVG1CsyDXTqLzZYzoDtQADmhdAwuKl6_bbHiKQU_Ddb_8AU_SD7u_r6Wt6HbKfZSZLAlZ0tjFZBD4lF3N8RDNlPI8tAT3z2F1DI7E2Xl0EtF4-6c31cYo8LLX_Bm1l7NzgdIvHbaMIYR7tzwVB2CI9OOjoUQVHa0Vg4Y3kLrr3I_8iOIpM4M39-rEw1_DBJTX8GHaA_MGLanGOvdPVLKoepCbLCuWzCDwR903FmoyRR0uYnHrmFwdmBv',
        outFields: ['*'],
        // renderer: pointsRenderer,
        elevationInfo: {
          // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
          mode: 'relative-to-scene'
        },
        // feature reduction is set to selection because our scene contains too many points and they overlap
        featureReduction: {
          type: 'selection'
        },
        labelingInfo: [{
          labelExpressionInfo: {
            value: '{code}'
          },
          symbol: {
            type: 'label-3d', // autocasts as new LabelSymbol3D()
            symbolLayers: [{
              type: 'text', // autocasts as new TextSymbol3DLayer()
              material: {
                color: 'orange'
              },
              // we set a halo on the font to make the labels more visible with any kind of background
              halo: {
                size: 1,
                color: [50, 50, 50]
              },
              size: 10
            }]
          }
        }]
        // popupTemplate: popupTemplate  
      });
      this.map.add(featureLayer);

      this.sceneView = new EsriSceneView(sceneViewProperties);


      this.sceneView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      console.log('We have an error: ' + error);
    }

  }

  async addPoints() {
    // this.birdService.getBirds().subscribe((results) => {
    //   console.log('mapComponent results are = ', results);
    //   this.birdModel = results;
    //   console.log('this.BirdModle = ', this.birdModel);
    // });
    try {
      const [Graphic, GraphicsLayer] = await loadModules([
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
      ]);

      // Raleigh
      const point = {
        type: 'point', // autocasts as new Point()
        x: -78.6382,
        y: 35.7796,
        z: 1010
      };

      const markerSymbol = {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      const graphicsLayer = new GraphicsLayer();
      this.map.add(graphicsLayer);

      graphicsLayer.add(pointGraphic);
      this.sceneView.graphics.add(pointGraphic);
      // this.sceneView.map.add(graphicsLayer);

    } catch (error) {
      console.log('We have an error: ' + error);
    }

  }

  ngOnInit() {
    this.initializeMap();
    this.addPoints();
  }

}
