import { Address, type AddressProps } from './address.vo';
import { expect, test, describe } from 'vitest';

describe('Address', () => {
  const validAddressProps: AddressProps = {
    street: '123 Main Street',
    city: 'Paris',
    state: 'Île-de-France',
    zip: '75001',
    country: 'France',
  };

  describe('create', () => {
    test('devrait créer une adresse valide', () => {
      const address = Address.create(validAddressProps);

      expect(address).toBeInstanceOf(Address);
      expect(address.props.street).toBe('123 Main Street');
      expect(address.props.city).toBe('Paris');
      expect(address.props.state).toBe('Île-de-France');
      expect(address.props.zip).toBe('75001');
      expect(address.props.country).toBe('France');
    });

    test('devrait créer une adresse avec des caractères spéciaux', () => {
      const addressWithSpecialChars: AddressProps = {
        street: "123 Rue de l'Église",
        city: 'Saint-Étienne',
        state: 'Auvergne-Rhône-Alpes',
        zip: '42000',
        country: 'France',
      };
      const address = Address.create(addressWithSpecialChars);

      expect(address).toBeInstanceOf(Address);
      expect(address.props.street).toBe("123 Rue de l'Église");
      expect(address.props.city).toBe('Saint-Étienne');
    });

    test('devrait lancer une erreur si street est manquant', () => {
      const invalidAddress = {
        ...validAddressProps,
        street: '',
      };

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si city est manquant', () => {
      const invalidAddress = {
        ...validAddressProps,
        city: '',
      };

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si state est manquant', () => {
      const invalidAddress = {
        ...validAddressProps,
        state: '',
      };

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si zip est manquant', () => {
      const invalidAddress = {
        ...validAddressProps,
        zip: '',
      };

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si country est manquant', () => {
      const invalidAddress = {
        ...validAddressProps,
        country: '',
      };

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si street est absent', () => {
      const invalidAddress = {
        city: 'Paris',
        state: 'Île-de-France',
        zip: '75001',
        country: 'France',
      } as AddressProps;

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si city est absent', () => {
      const invalidAddress = {
        street: '123 Main Street',
        state: 'Île-de-France',
        zip: '75001',
        country: 'France',
      } as AddressProps;

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si state est absent', () => {
      const invalidAddress = {
        street: '123 Main Street',
        city: 'Paris',
        zip: '75001',
        country: 'France',
      } as AddressProps;

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si zip est absent', () => {
      const invalidAddress = {
        street: '123 Main Street',
        city: 'Paris',
        state: 'Île-de-France',
        country: 'France',
      } as AddressProps;

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });

    test('devrait lancer une erreur si country est absent', () => {
      const invalidAddress = {
        street: '123 Main Street',
        city: 'Paris',
        state: 'Île-de-France',
        zip: '75001',
      } as AddressProps;

      expect(() => Address.create(invalidAddress)).toThrow(
        'Validation Address échouée',
      );
    });
  });

  describe('equals', () => {
    test('devrait retourner true pour deux adresses identiques', () => {
      const address1 = Address.create(validAddressProps);
      const address2 = Address.create(validAddressProps);

      expect(address1.equals(address2)).toBe(true);
    });

    test('devrait retourner false pour deux adresses différentes', () => {
      const address1 = Address.create(validAddressProps);
      const address2 = Address.create({
        ...validAddressProps,
        street: '456 Other Street',
      });

      expect(address1.equals(address2)).toBe(false);
    });

    test('devrait retourner false pour une adresse comparée à undefined', () => {
      const address = Address.create(validAddressProps);

      expect(address.equals(undefined)).toBe(false);
    });

    test('devrait retourner false pour une adresse comparée à null', () => {
      const address = Address.create(validAddressProps);

      expect(address.equals(null as any)).toBe(false);
    });
  });
});
