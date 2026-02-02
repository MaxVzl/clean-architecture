import { serve } from '@hono/node-server';
import { DIContainer } from '@/infrastructure/di/container';
import { registerAppModule } from '@/app.module';
import { createApp } from '@/presentation/app';

const diContainer = new DIContainer();
registerAppModule(diContainer);

const app = createApp(diContainer);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
