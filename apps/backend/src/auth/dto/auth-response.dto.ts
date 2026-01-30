import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: string;
}

export class AuthResponseDto {
    @ApiProperty()
    access_token: string;

    @ApiProperty({ description: 'Token expiration time in seconds (14400 = 4 hours)' })
    expires_in: number;

    @ApiProperty({ description: 'Exact timestamp when token expires' })
    expires_at: Date;

    @ApiProperty({ type: UserResponseDto })
    user: UserResponseDto;
}
