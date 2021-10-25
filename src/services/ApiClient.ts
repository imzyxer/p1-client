import AppAuthenticator, { TAppAuthenticator } from 'services/AppAuthenticator';
import { PATH_LOGIN, PATH_ERROR_500 } from 'constants/pages';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { InvalidResponse, SuccessResponse, InvalidConnection } from 'utils/response';

class ApiClient {
  private readonly client: AxiosInstance;
  private readonly authenticator: TAppAuthenticator;

  constructor(baseURL: string, authenticator: TAppAuthenticator) {
    this.authenticator = authenticator;
    this.client = this.getHttpClient(baseURL);
  }

  protected getHttpClient(baseURL: string): AxiosInstance {
    const instance = axios.create({ baseURL });
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
          window.location.href = PATH_LOGIN;
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  public post<T>(url: string, data = {}) {
    return this.client.post<T>(url, JSON.stringify(data), { headers: this.getAuthHeaders() }).then(this.handleSuccess).catch(this.handleError);
  }

  public takeGet<T>(url: string, params = {}) {
    return this.client.get<T>(url, { headers: this.getAuthHeaders(), params });
  }

  public get<T>(url: string, params = {}) {
    return this.takeGet<T>(url, params).then(this.handleSuccess).catch(this.handleError);
  }

  public put<T>(url: string, data = {}) {
    return this.client.put<T>(url, JSON.stringify(data), { headers: this.getAuthHeaders() }).then(this.handleSuccess).catch(this.handleError);
  }

  public delete<T>(url: string, params = {}) {
    return this.client.delete<T>(url, { headers: this.getAuthHeaders(), params }).then(this.handleSuccess).catch(this.handleError);
  }

  public getClient() {
    return this.client;
  }

  protected getCommonHeaders = () => ({
    'Content-Type': 'application/json',
  });

  protected getAuthHeaders() {
    const headers = this.getCommonHeaders();

    if (this.authenticator.getAccessToken()) {
      return {
        ...headers,
        Authorization: `Bearer ${this.authenticator.getAccessToken()}`,
      };
    }

    return headers;
  }

  handleSuccess = (response: AxiosResponse) => new SuccessResponse(response.data);

  handleError = (error: AxiosError) => {
    if (error.response) {
      // client received an error response (5xx, 4xx)
      return new InvalidResponse(error.response.data);
    }

    // if (error.request) or anything else
    // client never received a response, or request never left
    window.location.href = PATH_ERROR_500; // something went wrong
    return new InvalidConnection();
  };
}
const baseURL = process.env.REACT_APP_API_HOST ?? '';
const authenticator = AppAuthenticator;

export default new ApiClient(baseURL, authenticator);
