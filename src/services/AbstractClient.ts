import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import axiosRetry from 'axios-retry';
import IAbstractAuthenticator from './AbstractAuthenticator';

abstract class AbstractClient<A extends IAbstractAuthenticator> {
  private readonly httpClient: AxiosInstance;
  protected readonly authenticator: A;
  protected abstract getCommonHeaders(): Promise<AxiosRequestHeaders>;
  protected abstract getAuthHeaders(): Promise<AxiosRequestHeaders>;

  static toFormData = (data: any) =>
    Object.keys(data).reduce((formData, key) => {
      formData.append(key, data[key]);
      return formData;
    }, new FormData());

  protected constructor(baseURL: string, authenticator: A) {
    this.authenticator = authenticator;
    this.httpClient = this.createHttpClient(baseURL);
  }

  protected createHttpClient(baseURL: string): AxiosInstance {
    const instance: AxiosInstance = axios.create({ baseURL });
    const retryDelay = (retryNumber = 0) => {
      const seconds = 2 ** retryNumber * 1000;
      const randomMs = 1000 * Math.random();
      return seconds + randomMs;
    };

    axiosRetry(instance, {
      retries: 2,
      retryDelay,
      // retry on Network Error & 5xx responses
      retryCondition: axiosRetry.isRetryableError,
    });

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this.authenticator.revokeCredentials();
          this.authenticator.goToLogin();
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  private makeRequestConfig = (config: AxiosRequestConfig, authHeaders: AxiosRequestHeaders) => ({
    ...config,
    headers: {
      ...(config.headers ?? {}),
      ...authHeaders,
    },
  });

  public rawGet<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.getAuthHeaders().then(headers => this.httpClient.get<T>(url, this.makeRequestConfig(config, headers)));
  }

  public rawPost<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}) {
    return this.getAuthHeaders().then(headers => this.httpClient.post<T>(url, data, this.makeRequestConfig(config, headers)));
  }

  public rawPut<T = any>(url: string, data: any, config: AxiosRequestConfig = {}) {
    return this.getAuthHeaders().then(headers => this.httpClient.put<T>(url, data, this.makeRequestConfig(config, headers)));
  }

  public rawDelete<T = any>(url: string, config: AxiosRequestConfig = {}) {
    return this.getAuthHeaders().then(headers => this.httpClient.delete<T>(url, this.makeRequestConfig(config, headers)));
  }

  public getHttpClient() {
    return this.httpClient;
  }

  public getAuthenticator() {
    return this.authenticator;
  }
}

export default AbstractClient;
