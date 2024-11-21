import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifsList: Gif[] = [];

  private apiKey: string = 'GxlOUHTI29OvmJMANjyhv9gzv9IRa6Hc';
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    // fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=GxlOUHTI29OvmJMANjyhv9gzv9IRa6Hc&q=valorant&limit=10'
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data));

    // const resp = await fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=GxlOUHTI29OvmJMANjyhv9gzv9IRa6Hc&q=valorant&limit=10'
    // );
    // const data = await resp.json();
    // console.log(data);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifsList = res.data;
      });
  }
}
