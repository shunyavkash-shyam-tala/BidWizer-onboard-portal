import React, { useState, useEffect } from "react";
import style from "./SearchInput.module.css";
import useApiCall from "../../../hooks/useApiCall";
import apis from "../../../constants/apiCenter";

export default function SearchInput({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { loading, response, apiCall } = useApiCall();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        apiCall({
          ...apis.dealer.dealerSearch,
          query: { companyName: query },
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, apiCall]);

  useEffect(() => {
    if (response) {
      setResults(response?.data || []);
    }
  }, [response]);

  const handleSelectDealer = (dealer) => {
    setResults([]);
    if (onSelect) {
      onSelect(dealer);
      setQuery("");
    }
  };

  return (
    <div className={style.input_box}>
      <div className={style.inner_input}>
        <label className={style.input_label} htmlFor="association">
          Dealer Name <span>*</span>
        </label>
        <div className={style.input_wrapper}>
          <input
            type="text"
            name="association"
            id="association"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div
            className={`${style.loader} ${loading ? style.loading : ""}`}
            id="input_loader"
          ></div>
        </div>

        {results.length > 0 && (
          <ul
            className={`${style.suggestions_box} ${results?.length ? style.open : ""}`}
          >
            {results.map((dealer) => (
              <li
                key={dealer?.id}
                onClick={() => handleSelectDealer(dealer)}
                className={style.suggestion_item}
              >
                {dealer?.properties?.name}
              </li>
            ))}
          </ul>
        )}

        <ul
          className={`${style.suggestions_box} ${response?.data?.length === 0 ? style.open : ""}`}
        >
          {response?.data?.length === 0 && (
            <li key={1} className={style.suggestion_item}>
              No results found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
