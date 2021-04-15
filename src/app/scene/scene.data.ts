import { CelestialBody, CELESTIAL_BODY_TYPE } from "./scene.model";

/**
 * SVG does not work well with big number so we have to divide each value
 * (in km) by this ratio before drawing. This does NOT take into account
 * the scale applied by the current zoom !
 * https://oreillymedia.github.io/Using_SVG/extras/ch08-precision.html
 */
export const KM_TO_PX = 1e5;

/**
 * degrees to radian
 */
export const DEG_TO_RAD = Math.PI / 180;

 /**
  * Astronomical units to kilometers
  */
export const AU_TO_KM = 1.496e8;
 
 /**
  * Gravitational constant in m^3.kg^−1.s^−2
  */
export const G = 6.6743e-11;
 
 /**
  * in km
  */
export const SOLAR_SYSTEM_SIZE = 80 * AU_TO_KM;

export const SUN: CelestialBody = {
    id: 'sun',
    position: {
      x: 0,
      y: 0
    },
    speed: 0,
    mass: 1.9885e30,
    radius: 696342,
    semiMajorAxis: 0,
    eccentricity: 0,
    trueAnomaly: 0,
    type: CELESTIAL_BODY_TYPE.STAR,
    satellites: [],
    orbitBody: null
  };

  export const MERCURY: CelestialBody = {
    id: 'mercury',
    position: {
      x: 0,
      y: 57909050 / KM_TO_PX // TODO
    },
    speed: 47.36,
    mass: 3.3011e23,
    radius: 2440,
    semiMajorAxis: 57909050,
    eccentricity: 0.20563,
    trueAnomaly: 0,
    type: CELESTIAL_BODY_TYPE.PLANET,
    satellites: [],
    orbitBody: SUN
  };

  export const EARTH: CelestialBody = {
    id: 'earth',
    position: {
      x: 0,
      y: 147095000 / KM_TO_PX // TODO
    },
    speed: 29.78,
    mass: 5.97237e24,
    radius: 6371,
    semiMajorAxis: 149598023,
    eccentricity: 0.0167086,
    trueAnomaly: 0,
    type: CELESTIAL_BODY_TYPE.PLANET,
    satellites: [],
    orbitBody: SUN
  };

  SUN.satellites = [ MERCURY, EARTH ];

  export const SOLAR_SYSTEM: CelestialBody[] = [ SUN, MERCURY, EARTH ];