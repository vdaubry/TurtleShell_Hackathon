import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

@Module({
  controllers: [AuditController],
  providers: [AuditService],
  imports: [HttpModule],
})
export class AuditModule {}
