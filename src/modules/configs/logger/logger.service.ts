import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger(LoggerService.name);

  private formatMessage(
    level: string,
    message: string,
    method: string,
    additionalMessage?: string,
  ): string {
    const timestamp = new Date().toISOString();
    const baseMessage = additionalMessage
      ? `${message} - ${method} - ${additionalMessage}`
      : `${message} - ${method}`;

    return `[${timestamp}] ${level.toUpperCase()}: ${baseMessage}`;
  }

  info(message: string, method: string, additionalMessage?: string) {
    this.logger.log(
      this.formatMessage('info', message, method, additionalMessage),
    );
  }

  warn(message: string, method: string, additionalMessage?: string) {
    this.logger.warn(
      this.formatMessage('warn', message, method, additionalMessage),
    );
  }

  error(message: string, method: string, additionalMessage?: string) {
    this.logger.error(
      this.formatMessage('error', message, method, additionalMessage),
    );
  }
}
