import {Component, OnInit} from '@angular/core';
import { Preferences } from "@capacitor/preferences";
import {CoursService} from "./services/cours.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    private service: CoursService
  ) {}

  async ngOnInit() {
   await this.service.loadSaved()
  }
}
