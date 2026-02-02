import type { DIContainerTypes } from '@/infrastructure/di/types';

export class DIContainer {
  private readonly factories: Record<string, (c: DIContainer) => any> = {};
  private readonly instances: Record<string, any> = {};

  register<K extends keyof DIContainerTypes>(
    key: K,
    factory: (c: DIContainer) => DIContainerTypes[K],
  ) {
    this.factories[key] = factory;
  }

  get<K extends keyof DIContainerTypes>(key: K): DIContainerTypes[K] {
    if (this.instances[key]) {
      return this.instances[key];
    }
    const factory = this.factories[key];
    if (!factory) {
      throw new Error(`Aucun provider trouvé pour : ${key}`);
    }
    const instance = factory(this);
    this.instances[key] = instance;
    return instance;
  }

  override<K extends keyof DIContainerTypes>(
    key: K,
    instance: DIContainerTypes[K],
  ) {
    this.instances[key] = instance;
    delete this.factories[key];
  }
}
