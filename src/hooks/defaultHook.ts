import { useEffect, useState } from "react";
import { ReceivedMethodType, fetchData } from "../rest";

interface DefaultHookParams<T> {
  defaultValue: T;
  rest: {
    name: string;
    method: ReceivedMethodType;
    body?: Record<string, any>;
  };
  dataKey?: string;
}

const defaultHook = <T = any>(params: DefaultHookParams<T>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>(params.defaultValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);

    const result = await fetchData<T>(
      params.rest.name,
      "POST",
      params.rest.body
    );

    if (result.success && result.data) {
      setData(result.data);
    } else if (result.success === false) {
      setErrorMessage(result.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params.rest.body]);

  return {
    [params.dataKey || "data"]: data,
    error: errorMessage,
    loading,
  };
};

export default defaultHook;
