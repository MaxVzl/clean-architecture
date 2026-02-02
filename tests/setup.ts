import { registerAppModule } from '@/app.module';
import { DIContainer } from '@/infrastructure/di/container';
import { beforeEach } from 'vitest';

let diContainer: DIContainer;

beforeEach(() => {
  diContainer = new DIContainer();
  registerAppModule(diContainer);
});

export { diContainer };
