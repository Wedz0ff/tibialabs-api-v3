import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class TibiaDataService {
  constructor(private readonly httpService: HttpService) {}

  async tibiaDataRequest<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const baseUrl = 'https://api.tibiadata.com/v4/';
      const response = await firstValueFrom(
        this.httpService.get<T>(`${baseUrl}${endpoint}`, config),
      );
      return response.data;
    } catch (error: unknown) {
      // Ensure 'error' is typed as unknown
      console.error('Error making HTTP request:', this.getErrorMessage(error));
      throw new Error('Failed to make HTTP request');
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error === 'object' && error !== null) {
      try {
        return JSON.stringify(error);
      } catch {
        return 'Unknown error';
      }
    }
    return 'Unknown error';
  }
}
