import { useState, useEffect } from 'react';
import { accessToken, baseURL } from 'renderer/components/styled';
// import { baseURL } from 'renderer/components/styled';

const useDataFetching = (apiUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);


  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}${apiUrl}`, {
          method: "GET",
          headers: {
            Authorization: `Token ${accessToken}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
          }
        });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const refreshData = () => {
    setRefreshFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  return { data, error, refreshData };
};

export default useDataFetching;
