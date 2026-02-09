import { Geo, type GeoProps } from './geo.vo';
import { expect, test, describe } from 'vitest';

describe('Geo', () => {
  describe('create', () => {
    test('devrait créer un Geo valide', () => {
      const validGeo: GeoProps = {
        latitude: 48.8566,
        longitude: 2.3522,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.latitude).toBe(48.8566);
      expect(geo.props.longitude).toBe(2.3522);
    });

    test('devrait créer un Geo avec latitude négative', () => {
      const validGeo: GeoProps = {
        latitude: -33.8688,
        longitude: 151.2093,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.latitude).toBe(-33.8688);
    });

    test('devrait créer un Geo avec longitude négative', () => {
      const validGeo: GeoProps = {
        latitude: 40.7128,
        longitude: -74.006,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.longitude).toBe(-74.006);
    });

    test('devrait créer un Geo aux limites (latitude 90)', () => {
      const validGeo: GeoProps = {
        latitude: 90,
        longitude: 0,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.latitude).toBe(90);
    });

    test('devrait créer un Geo aux limites (latitude -90)', () => {
      const validGeo: GeoProps = {
        latitude: -90,
        longitude: 0,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.latitude).toBe(-90);
    });

    test('devrait créer un Geo aux limites (longitude 180)', () => {
      const validGeo: GeoProps = {
        latitude: 0,
        longitude: 180,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.longitude).toBe(180);
    });

    test('devrait créer un Geo aux limites (longitude -180)', () => {
      const validGeo: GeoProps = {
        latitude: 0,
        longitude: -180,
      };
      const geo = Geo.create(validGeo);

      expect(geo).toBeInstanceOf(Geo);
      expect(geo.props.longitude).toBe(-180);
    });

    test('devrait lancer une erreur pour une latitude supérieure à 90', () => {
      const invalidGeo: GeoProps = {
        latitude: 91,
        longitude: 0,
      };

      expect(() => Geo.create(invalidGeo)).toThrow('Validation Geo échouée');
    });

    test('devrait lancer une erreur pour une latitude inférieure à -90', () => {
      const invalidGeo: GeoProps = {
        latitude: -91,
        longitude: 0,
      };

      expect(() => Geo.create(invalidGeo)).toThrow('Validation Geo échouée');
    });

    test('devrait lancer une erreur pour une longitude supérieure à 180', () => {
      const invalidGeo: GeoProps = {
        latitude: 0,
        longitude: 181,
      };

      expect(() => Geo.create(invalidGeo)).toThrow('Validation Geo échouée');
    });

    test('devrait lancer une erreur pour une longitude inférieure à -180', () => {
      const invalidGeo: GeoProps = {
        latitude: 0,
        longitude: -181,
      };

      expect(() => Geo.create(invalidGeo)).toThrow('Validation Geo échouée');
    });

    test('devrait lancer une erreur si latitude est manquante', () => {
      const invalidGeo = {
        longitude: 0,
      } as GeoProps;

      expect(() => Geo.create(invalidGeo)).toThrow('Validation Geo échouée');
    });

    test('devrait lancer une erreur si longitude est manquante', () => {
      const invalidGeo = {
        latitude: 0,
      } as GeoProps;

      expect(() => Geo.create(invalidGeo)).toThrow('Validation Geo échouée');
    });
  });

  describe('equals', () => {
    test('devrait retourner true pour deux Geo identiques', () => {
      const props: GeoProps = {
        latitude: 48.8566,
        longitude: 2.3522,
      };
      const geo1 = Geo.create(props);
      const geo2 = Geo.create(props);

      expect(geo1.equals(geo2)).toBe(true);
    });

    test('devrait retourner false pour deux Geo différents', () => {
      const geo1 = Geo.create({ latitude: 48.8566, longitude: 2.3522 });
      const geo2 = Geo.create({ latitude: 40.7128, longitude: -74.006 });

      expect(geo1.equals(geo2)).toBe(false);
    });

    test('devrait retourner false pour un Geo comparé à undefined', () => {
      const geo = Geo.create({ latitude: 48.8566, longitude: 2.3522 });

      expect(geo.equals(undefined)).toBe(false);
    });

    test('devrait retourner false pour un Geo comparé à null', () => {
      const geo = Geo.create({ latitude: 48.8566, longitude: 2.3522 });

      expect(geo.equals(null as any)).toBe(false);
    });
  });
});
