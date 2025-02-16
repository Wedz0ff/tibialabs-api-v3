import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { getErrorMessage } from '@/utils/error';
import { TibiaDataResponse } from './tibiadata.interface';

@Injectable()
export class TibiaDataService {
  constructor(private readonly httpService: HttpService) {}

  // async tibiaDataRequest<T>(
  //   endpoint: string,
  //   config?: AxiosRequestConfig,
  // ): Promise<T> {
  //   try {
  //     const baseUrl = 'https://api.tibiadata.com/v4/';
  //     const response = await firstValueFrom(
  //       this.httpService.get<T>(`${baseUrl}${endpoint}`, config),
  //     );

  //     if (response.status !== 200) {
  //       throw new HttpException(
  //         `Unexpected response status: ${response.status}`,
  //         response.status,
  //       );
  //     }

  //     return response.data;
  //   } catch (error: unknown) {
  //     // Handle Axios errors (e.g., 400 Bad Request)
  //     if (error instanceof AxiosError) {
  //       if (error.response?.status === 400) {
  //         // Return a custom object or throw a specific error for 400
  //         throw new HttpException(
  //           `Bad Request: ${error.response.data}`,
  //           error.response.status,
  //         );
  //       }
  //     }

  //     console.error('Error making HTTP request:', getErrorMessage(error));
  //     throw new HttpException('Failed to make HTTP request', 500);
  //   }
  // }
  async tibiaDataRequest<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<TibiaDataResponse<T>> {
    try {
      const baseUrl = 'https://api.tibiadata.com/v4/';
      const response = await firstValueFrom(
        this.httpService.get<T>(`${baseUrl}${endpoint}`, config),
      );

      if (response.status !== 200) {
        return {
          error: `Unexpected response status: ${response.status}`,
          statusCode: response.status,
        };
      }

      return { data: response.data, statusCode: response.status };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          error: `Request failed: ${error.response?.data || error.message}`,
          statusCode: error.response?.status || 500,
        };
      }

      return {
        error: 'Unknown error occurred',
        statusCode: 500,
      };
    }
  }
}
