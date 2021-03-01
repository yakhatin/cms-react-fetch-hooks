import { UseFetchInterface, UseFetchParams } from "../types/use-fetch";
declare const defaultHook: <T = any>(params: UseFetchParams<T>) => UseFetchInterface<T>;
export default defaultHook;
