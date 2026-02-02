import type { PostsTypes } from '@/infrastructure/di/definitions/posts.types';
import type { SharedTypes } from '@/infrastructure/di/definitions/shared.types';
import type { UsersTypes } from '@/infrastructure/di/definitions/users.types';

export type DIContainerTypes = SharedTypes & UsersTypes & PostsTypes;
