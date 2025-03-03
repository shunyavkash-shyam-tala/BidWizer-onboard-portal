import { useState, useCallback } from "react";
import axios from "axios";

const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const apiCall = useCallback(
    async ({ method = "GET", url, query = {}, body = null, headers = {} }) => {
      setLoading(true);
      setError(null);

      try {
        const config = {
          method,
          url: `${import.meta.env.VITE_API_URL}${url}`,
          params: query,
          data: body,
          headers: {
            "client-hubspot-api-secret": import.meta.env.VITE_HUBSPOT_SECRET,
            "Content-Type": "application/json",
            ...headers,
          },
        };

        const { data } = await axios(config);
        setResponse(data);
        return data;
      } catch (err) {
        setError(err.response?.data || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, response, error, apiCall };
};

export default useApiCall;
