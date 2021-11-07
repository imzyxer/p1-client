import AbstractClient from 'services/AbstractClient';
import { AxiosError, AxiosResponse } from 'axios';
import ResponseDto, { InvalidConnectionDto } from 'services/ResponseDto';
import { TPrimaryAuthenticator } from 'services/PrimaryAuthenticator';

class PrimaryClient extends AbstractClient<TPrimaryAuthenticator> {
  private static client?: PrimaryClient;

  public static getClient() {
    return () => {
      if (!this.client) {
        throw new Error('The client instance has not been created yet. Use the static method createClientInstance to create it.');
      }
      return this.client;
    };
  }

  public static createClientInstance(baseURL: string, authenticator: TPrimaryAuthenticator) {
    if (!this.client) {
      this.client = new this(baseURL, authenticator);
    }
  }

  public get<T>(url: string, params = {}) {
    return this.rawGet<T>(url, { params }).then(this.handleSuccess).catch(this.handleError);
  }

  public post<T>(url: string, data: any) {
    return this.rawPost<T>(url, data).then(this.handleSuccess).catch(this.handleError);
  }

  public put<T>(url: string, data: any) {
    return this.rawPut<T>(url, JSON.stringify(data)).then(this.handleSuccess).catch(this.handleError);
  }

  public delete<T>(url: string, params = {}) {
    return this.rawDelete<T>(url, params).then(this.handleSuccess).catch(this.handleError);
  }

  protected getCommonHeaders = async () => ({
    'Content-Type': 'application/json',
  });

  protected async getAuthHeaders() {
    return Promise.all([this.getCommonHeaders(), this.authenticator.getCredentials()]).then(result => {
      const [commonHeaders, credentials] = result;

      return {
        ...commonHeaders,
        Authorization: `Bearer ${credentials.accessToken}`,
      };
    });
  }

  public handleSuccess = <T extends any>(response: AxiosResponse<T>): Promise<ResponseDto<T>> => Promise.resolve(new ResponseDto<T>(response.data));

  public handleError = <T extends any>(error: AxiosError<T>) => {
    if (error.response) {
      // Request made and server responded
      // Client received an error response (5xx, 4xx)
      return Promise.reject(new ResponseDto<T>(error.response.data));
    }
    if (error.request) {
      // The request was made but no response was received
      // For example we can execute: this.authenticator.goToError500();
      return Promise.reject(new InvalidConnectionDto());
    }

    // Something happened in setting up the request that triggered an Error
    return Promise.reject(new InvalidConnectionDto());
  };
}

export default PrimaryClient;
