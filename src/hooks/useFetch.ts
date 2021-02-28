import { useEffect, useState } from "react";
import { fetchData } from "../rest";
import { UseFetchInterface, UseFetchParams } from "../types/use-fetch";

const defaultHook = <T = any>(params: UseFetchParams<T>): UseFetchInterface<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>(params.defaultValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);

    const result = await fetchData<T>(
      params.rest.name,
      params.rest.method,
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
    data,
    error: errorMessage,
    loading,
  };
};

export default defaultHook;
