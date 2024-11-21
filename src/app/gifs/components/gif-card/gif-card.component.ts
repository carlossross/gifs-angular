import { Component } from '@angular/core';

@Component({
  selector: 'gif-card',
  template: `
    <div class="card mb-2 text-center bg-dark">
      <ng-content></ng-content>
    </div>
  `
})
export class GifCardComponent {

}
