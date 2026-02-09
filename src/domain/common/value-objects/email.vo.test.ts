import { Email } from './email.vo';
import { expect, test, describe } from 'vitest';

describe('Email', () => {
  describe('create', () => {
    test('devrait créer un email valide', () => {
      const validEmail = 'test@example.com';
      const email = Email.create(validEmail);

      expect(email).toBeInstanceOf(Email);
      expect(email.props.value).toBe(validEmail);
    });

    test('devrait créer un email avec sous-domaine', () => {
      const validEmail = 'user@mail.example.com';
      const email = Email.create(validEmail);

      expect(email).toBeInstanceOf(Email);
      expect(email.props.value).toBe(validEmail);
    });

    test('devrait créer un email avec caractères spéciaux', () => {
      const validEmail = 'user+tag@example.com';
      const email = Email.create(validEmail);

      expect(email).toBeInstanceOf(Email);
      expect(email.props.value).toBe(validEmail);
    });

    test('devrait lancer une erreur pour un email invalide', () => {
      const invalidEmail = 'not-an-email';

      expect(() => Email.create(invalidEmail)).toThrow(
        'Validation Email échouée',
      );
    });

    test('devrait lancer une erreur pour un email sans @', () => {
      const invalidEmail = 'testexample.com';

      expect(() => Email.create(invalidEmail)).toThrow(
        'Validation Email échouée',
      );
    });

    test('devrait lancer une erreur pour un email trop court', () => {
      const invalidEmail = 'a@b.c';

      expect(() => Email.create(invalidEmail)).toThrow(
        'Validation Email échouée',
      );
    });

    test('devrait lancer une erreur pour une chaîne vide', () => {
      expect(() => Email.create('')).toThrow('Validation Email échouée');
    });

    test('devrait lancer une erreur pour un email sans domaine', () => {
      const invalidEmail = 'test@';

      expect(() => Email.create(invalidEmail)).toThrow(
        'Validation Email échouée',
      );
    });
  });

  describe('equals', () => {
    test('devrait retourner true pour deux emails identiques', () => {
      const value = 'test@example.com';
      const email1 = Email.create(value);
      const email2 = Email.create(value);

      expect(email1.equals(email2)).toBe(true);
    });

    test('devrait retourner false pour deux emails différents', () => {
      const email1 = Email.create('test1@example.com');
      const email2 = Email.create('test2@example.com');

      expect(email1.equals(email2)).toBe(false);
    });

    test('devrait retourner false pour un email comparé à undefined', () => {
      const email = Email.create('test@example.com');

      expect(email.equals(undefined)).toBe(false);
    });

    test('devrait retourner false pour un email comparé à null', () => {
      const email = Email.create('test@example.com');

      expect(email.equals(null as any)).toBe(false);
    });
  });
});
