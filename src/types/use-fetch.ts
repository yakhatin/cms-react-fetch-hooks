import { ReceivedMethodType } from "../rest";

export interface UseFetchParams<T> {
  defaultValue: T;
  rest: {
    name: string;
    method: ReceivedMethodType;
    body?: Record<string, any>;
  };
}

export interface UseFetchParamsWithContext<T> extends UseFetchParams<T> {
  key: string;
}

export interface UseFetchInterface<T> {
    data: T;
    error: string | null;
    loading: boolean;
}
