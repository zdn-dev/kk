import { AuthGuard } from '@nestjs/passport';

export class LocalGuards extends AuthGuard('local') {}
