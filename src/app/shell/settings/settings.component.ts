import { Component } from '@angular/core';
import {OrbitsSetting, SettingsService} from './settings.service';
import {AVAILABLE_LANGUAGES} from '../../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
  public OrbitsSetting = OrbitsSetting;

  public get language(): string {
    return this.settingsService.language;
  }
  public set language(value: string) {
    this.settingsService.language = value;
  }

  public get metric(): boolean {
    return this.settingsService.metric;
  }
  public set metric(value: boolean) {
    this.settingsService.metric = value;
  }

  public get reticule(): boolean {
    return this.settingsService.reticule;
  }
  public set reticule(value: boolean) {
    this.settingsService.reticule = value;
  }

  public get orbits(): OrbitsSetting {
    return this.settingsService.orbits;
  }
  public set orbits(value: OrbitsSetting) {
    this.settingsService.orbits = value;
  }

  public get labels(): boolean {
    return this.settingsService.labels;
  }
  public set labels(value: boolean) {
    this.settingsService.labels = value;
  }

  public get milkyWay(): boolean {
    return this.settingsService.milkyWay;
  }
  public set milkyWay(value: boolean) {
    this.settingsService.milkyWay = value;
  }

  public get scale(): boolean {
    return this.settingsService.scale;
  }
  public set scale(value: boolean) {
    this.settingsService.scale = value;
  }

  constructor(
    private settingsService: SettingsService
  ) { }

}
