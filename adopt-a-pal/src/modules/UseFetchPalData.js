import { useState, useEffect } from "react";

const useFetchPalData = (userData, token) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [palDataList, setPalDataList] = useState([]);

  useEffect(() => {
    const fetchPalData = async () => {
      if (userData && userData.pals && userData.pals.length > 0) {
        try {
          const palDataPromises = userData.pals.map(async (palId) => {
            const response = await fetch(`/api/animals/${palId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }

            const jsonData = await response.json();

            const {
              id,
              name,
              added,
              availability,
              avatars,
              breed,
              species,
              dispositions,
            } = jsonData;

            const filteredData = {
              id,
              name,
              added,
              availability,
              avatars,
              breed,
              species,
              dispositions,
            };

            return filteredData;
          });

          const palData = await Promise.all(palDataPromises);
          setPalDataList(palData);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchPalData();
  }, [userData, token]);

  return [palDataList, loading, error];
};

export default useFetchPalData;
