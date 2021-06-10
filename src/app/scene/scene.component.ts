import { Component, AfterViewInit } from '@angular/core';
import {OrbitPoint, Point} from './scene.model';
import { select } from 'd3-selection';
import { line, curveCardinalClosed } from 'd3-shape';
import { zoom, zoomIdentity } from 'd3-zoom';
import {KM_TO_PX, SceneService, SOLAR_SYSTEM_SIZE} from './scene.service';
import { SOLAR_SYSTEM} from './data/SolarSystem.data';

const NB_POINTS_ORBIT: number = 90;

enum ZoomLevel {
  SOLAR_SYSTEM = 'zoom-level-solar-system',
  PLANET = 'zoom-level-planet'
};

const SCALE_PLANET: number = 0.0007;

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements AfterViewInit {

  private svgSelection: any;
  private groupZoomableSelection: any;
  private groupStaticSelection: any;
  private width: number = window.innerWidth; // px
  private height: number = window.innerHeight; // px
  private center: Point = {
    x: window.innerWidth / 2, // px
    y: window.innerHeight / 2 // px
  };
  private scale: number;
  private zoomLevel: ZoomLevel;

  constructor(
    private sceneService: SceneService
  ) { }

  public ngAfterViewInit(): void {
    this.svgSelection = select('svg');
    this.groupZoomableSelection = this.svgSelection.append('g');
    this.groupStaticSelection = this.svgSelection.append('g');

    this.initCelestialBodies();
    this.initOrbits();
    this.initZoom();
  }

  private initZoom(): void {
    const d3Zoom = zoom()
      .on('zoom', (e) => {
        this.scale = e.transform.k;
        this.zoomLevel = (this.scale >= SCALE_PLANET) ? ZoomLevel.PLANET : ZoomLevel.SOLAR_SYSTEM;

        for (const level in ZoomLevel) {
          this.svgSelection.classed(ZoomLevel[level], this.zoomLevel === ZoomLevel[level]);
        }
        this.groupZoomableSelection.attr('transform', e.transform);
        this.initTooltips();
      })
      .on('start', () => {
       // this.clearTooltips();
      })
      .on('end', () => {
       // this.initTooltips();
      });
    this.svgSelection.call(d3Zoom);

    const defaultZoom = zoomIdentity
                          .translate(this.center.x, this.center.y)
                          .scale(Math.min(this.width, this.height) / (SOLAR_SYSTEM_SIZE / KM_TO_PX));
    this.svgSelection.call(d3Zoom.transform, defaultZoom);
  }

  private initCelestialBodies(): void {
    this.groupZoomableSelection.selectAll('.celestial-body')
                                .data(SOLAR_SYSTEM, (d) => d.id)
                                .join(
                                  enter => enter.append('circle')
                                                .attr('id', (body) => body.id)
                                                .attr('class', (body) => 'celestial-body ' + body.type + ' ' + body.id)
                                                .attr('r', (body) => body.radius / KM_TO_PX)
                                                .attr('cx', (body) => body.position.x)
                                                .attr('cy', (body) => body.position.y)
                                );
  }

  private initOrbits(): void {
    const orbitsData = SOLAR_SYSTEM
                        .filter((body) => body.id !== 'sun')
                        .map((body) => {
                          return {
                            body,
                            path: this.sceneService.getOrbit(body, NB_POINTS_ORBIT)
                          };
                        });
    const lineFn = line<OrbitPoint>().curve(curveCardinalClosed).x(p => p.x).y(p => p.y);

    this.groupZoomableSelection.selectAll('.orbit')
                               .data(orbitsData, (d) => d.body.id)
                               .join(
                                 enter => enter.append('path')
                                               .attr('class', (orbit) => 'orbit ' + orbit.body.type + ' ' + orbit.body.id)
                                               .attr('d', (orbit) => lineFn(orbit.path))
                               );
  }

  private initTooltips(): void {
    this.groupStaticSelection.selectAll('.tooltip')
                             .data(SOLAR_SYSTEM, (d) => d.id)
                             .join(
                              enter => enter.append('text')
                                            .attr('class', (body) => 'tooltip ' + body.type + ' ' + body.id)
                                            .text((body) => body.id)
                                            .attr('x', (body) => (<any>select('#' + body.id).node()).getBoundingClientRect().x)
                                            .attr('y', (body) =>  (<any>select('#' + body.id).node()).getBoundingClientRect().y),
                              update => update.attr('x', (body) => (<any>select('#' + body.id).node()).getBoundingClientRect().x)
                                              .attr('y', (body) =>  (<any>select('#' + body.id).node()).getBoundingClientRect().y)
                            );
  }

  private clearTooltips(): void {
    this.groupStaticSelection.selectAll('.tooltip').remove();
  }

}
