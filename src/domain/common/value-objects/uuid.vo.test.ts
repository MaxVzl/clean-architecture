import { UUID } from './uuid.vo';
import { expect, test, describe } from 'vitest';

describe('UUID', () => {
  describe('create', () => {
    test('devrait créer un UUID valide', () => {
      const validUUID = '550e8400-e29b-41d4-a716-446655440000';
      const uuid = UUID.create(validUUID);

      expect(uuid).toBeInstanceOf(UUID);
      expect(uuid.props.value).toBe(validUUID);
    });

    test('devrait lancer une erreur pour un UUID invalide', () => {
      const invalidUUID = 'not-a-valid-uuid';

      expect(() => UUID.create(invalidUUID)).toThrow('Validation UUID échouée');
    });

    test('devrait lancer une erreur pour une chaîne vide', () => {
      expect(() => UUID.create('')).toThrow('Validation UUID échouée');
    });

    test('devrait lancer une erreur pour un UUID v3', () => {
      const uuidV3 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
      // Note: z.uuidv4() valide uniquement les UUID v4
      expect(() => UUID.create(uuidV3)).toThrow('Validation UUID échouée');
    });
  });

  describe('generate', () => {
    test('devrait générer un UUID valide', () => {
      const uuid = UUID.generate();

      expect(uuid).toBeInstanceOf(UUID);
      expect(uuid.props.value).toBeDefined();
      expect(uuid.props.value).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });

    test('devrait générer des UUID différents à chaque appel', () => {
      const uuid1 = UUID.generate();
      const uuid2 = UUID.generate();

      expect(uuid1.props.value).not.toBe(uuid2.props.value);
    });
  });

  describe('equals', () => {
    test('devrait retourner true pour deux UUID identiques', () => {
      const value = '550e8400-e29b-41d4-a716-446655440000';
      const uuid1 = UUID.create(value);
      const uuid2 = UUID.create(value);

      expect(uuid1.equals(uuid2)).toBe(true);
    });

    test('devrait retourner false pour deux UUID différents', () => {
      const uuid1 = UUID.create('550e8400-e29b-41d4-a716-446655440000');
      const uuid2 = UUID.create('550e8400-e29b-41d4-a716-446655440001');

      expect(uuid1.equals(uuid2)).toBe(false);
    });

    test('devrait retourner false pour un UUID comparé à undefined', () => {
      const uuid = UUID.create('550e8400-e29b-41d4-a716-446655440000');

      expect(uuid.equals(undefined)).toBe(false);
    });

    test('devrait retourner false pour un UUID comparé à null', () => {
      const uuid = UUID.create('550e8400-e29b-41d4-a716-446655440000');

      expect(uuid.equals(null as any)).toBe(false);
    });
  });
});
