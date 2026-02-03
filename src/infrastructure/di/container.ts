import type { DIContainerTypes } from './types';

type FactoryMap = Partial<
  Record<
    keyof DIContainerTypes,
    (c: DIContainer) => DIContainerTypes[keyof DIContainerTypes]
  >
>;

type InstanceMap = Partial<
  Record<keyof DIContainerTypes, DIContainerTypes[keyof DIContainerTypes]>
>;

export class DIContainer {
  private readonly factories: FactoryMap = {};
  private readonly instances: InstanceMap = {};

  register<K extends keyof DIContainerTypes>(
    key: K,
    factory: (c: DIContainer) => DIContainerTypes[K],
  ) {
    this.factories[key] = factory as FactoryMap[K];
  }

  get<K extends keyof DIContainerTypes>(key: K): DIContainerTypes[K] {
    if (this.instances[key]) {
      return this.instances[key] as DIContainerTypes[K];
    }
    const factory = this.factories[key];
    if (!factory) {
      throw new Error(`No provider found for: ${key}`);
    }
    const instance = factory(this);
    this.instances[key] = instance as InstanceMap[K];
    return instance as DIContainerTypes[K];
  }

  override<K extends keyof DIContainerTypes>(
    key: K,
    instance: DIContainerTypes[K],
  ) {
    this.instances[key] = instance as InstanceMap[K];
    Reflect.deleteProperty(this.factories, key as string);
  }
}
