// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
}
