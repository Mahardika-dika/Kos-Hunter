import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'IsPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
