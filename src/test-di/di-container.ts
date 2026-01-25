export class DIContainer {
  private readonly factories: Record<string, (c: DIContainer) => any> = {};
  private readonly instances: Record<string, any> = {};

  register<T>(key: string, factory: (c: DIContainer) => T) {
    this.factories[key] = factory;
  }

  get<T>(key: string): T {
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
}