// Hooks for committeees
import { useState, useEffect } from "react";
import { api } from "@/app/api/axiox";

const cache = {};

export function useCommittees(committeeName) {
    const [committeeData, setData] = useState(null);
    const [isCommitteeLoading, setIsLoading] = useState(true);
    const [committeeError, setError] = useState(null);
  
    useEffect(() => {
      if(!committeeName) return;

      const cacheKey = committeeName.trim().toLowerCase();
      if (cache[cacheKey]) {
        setData(cache[cacheKey]);
        setIsLoading(false);
        return;
      }

      const getCommitteeData = async () => {
          try {
            const response = await api.get(`/api/committtees`,{
              params: {
                "pagination[pageSize]": 25, 
                "pagination[page]": 1,
                populate: "*",
              },
            });
            const committee = response.data.data.find(
              (c) => c.Name.trim().toLowerCase() === committeeName.trim().toLowerCase()
            );
            cache[cacheKey] = committee;
            setData(committee);
          } catch (err) {
            setError(err);
          } finally {
            setIsLoading(false);
          }
      };

      getCommitteeData();
    }, [committeeName]);
    
    return { committeeData, isCommitteeLoading, committeeError };
}
