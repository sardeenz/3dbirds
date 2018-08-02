import { BirdModel } from './bird-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBirdsService {
  private birdUrl = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/bird_scooter_locations/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=n7c-Lj-4_b40ZFgbYl0ETFJZgocRH0fAUMYuyGiRWzfy-IyUlNi5zGzPLsQVLvKuUFBP0xQwBU9Zzs3o4iYNcHJUEA--Jk71SQ3_YM0o31ZtID4fvyLDnL6o7IeFyd3MX_foMIuQfGqLfrgxV7GKlmxWjrQZT8jHHAvxECmhh2rmDVlc9c1GtHim2flENGy8aGPIVzUFedpybbRolaE07-1oeQZqdbR_VT7z3a9Ndk1tYZ2d4eJa3OlzAhu1R_wP';

  constructor(private http: HttpClient) { }

  getBirds(): Observable<BirdModel> {
    return this.http.get<BirdModel>(this.birdUrl);
  }
}
