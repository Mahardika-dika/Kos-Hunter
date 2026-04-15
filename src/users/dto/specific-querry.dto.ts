import { ApiPropertyOptional } from '@nestjs/swagger';

export class SpecificQuerry {
  @ApiPropertyOptional({
    example: '1',
    description: 'Filter berdasarkan ID user.',
  })
  id?: string;

  @ApiPropertyOptional({
    example: 'Budi',
    description: 'Filter berdasarkan nama user.',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'budi@mail.com',
    description: 'Filter berdasarkan email user.',
  })
  email?: string;
}
