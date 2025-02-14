import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { getErrorMessage } from '@/utils/error';

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
      console.error('Error making HTTP request:', getErrorMessage(error));
      throw new Error('Failed to make HTTP request');
    }
  }
}
