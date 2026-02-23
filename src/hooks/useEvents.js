// Hooks for events
import { useState, useEffect } from "react";
import { api } from "@/app/api/axiox";
import getImageUrl from "@/lib/strapiImg";

/**
 * @param {string} eventType - The type of events to fetch (default: "events")
 * @returns {Object} An object containing the events, loading state, and error (if any)
 * @example
 * const { events, isLoading, error } = useEvents("events");
 * @author Vinit K
 */

const getMonthName = (monthNumber) => {
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return monthNames[monthNumber - 1] || "";
};

export function useEvents(eventType="events") {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const STORAGE_KEY = `events_${eventType}`;
      const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
      const getEvents = async () => {
        try {

          if (typeof window !== "undefined") {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
              const { timestamp, data } = JSON.parse(cached);
              if (Date.now() - timestamp < CACHE_DURATION) {
                setData(data);
                setIsLoading(false);
                return;
              }
            }
          }
          
          const response = await api.get(`/api/${eventType}`,{
            params: {
              "pagination[pageSize]": 25, 
              "pagination[page]": 1,
              populate: "*",
            },
          });
          let allEvents = [...response.data.data];
          const { pageCount } = response.data.meta.pagination;
          
          const requests = [];
          for (let page = 2; page <= pageCount; page++) {
            requests.push(
              api.get(`/api/${eventType}`, {
                params: {
                  "pagination[pageSize]": 25,
                  "pagination[page]": page,
                  populate: "*",
                },
              })
            );
          }

          const responses = await Promise.all(requests);
          allEvents.push(...responses.flatMap(res => res.data.data));

          sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now(), data: allEvents }));
          setData(allEvents);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      getEvents();
    }, [eventType]);

    const processedData = data.map(event => ({
      ...event,
      // Just passing the day part of the date to the EventCard, since that's all it needs
      eventDay: event.date ? event.date.substring(8,10) : null,
      eventMonth: event.date ? getMonthName(parseInt(event.date.substring(5,7))) : null,
      eventCover: event.cover ? getImageUrl(event.cover) : null,

    }));

    return { data: processedData, isLoading, error };
}

export function useWorkshops() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const response = await api.get("/api/workshops", {
          params: {
            "pagination[pageSize]": 25, 
            "pagination[page]": 1,
            populate: "*",
          },
        });
        let allWorkshops = [...response.data.data];
        const { pageCount } = response.data.meta.pagination;
        const requests = [];
        for (let page = 2; page <= pageCount; page++) {
          requests.push(
            api.get("/api/workshops", {
              params: {
                "pagination[pageSize]": 25,
                "pagination[page]": page,
                populate: "*",
              },
            })
          );
        }

        const responses = await Promise.all(requests);
        allWorkshops.push(...responses.flatMap(res => res.data.data));
        setData(allWorkshops);
      }
      catch (err) {
        setError(err);
      }
      finally {
        setIsLoading(false);
      }
    };

    getWorkshops();
  }, []);

  const processedData = data.map(workshop => ({
    ...workshop,
    // Just passing the day part of the date to the EventCard, since that's all it needs
    eventDay: workshop.date ? workshop.date.substring(8,10) : null,
    eventCover: workshop.cover ? getImageUrl(workshop.cover) : null,
    eventMonth: workshop.date ? getMonthName(parseInt(workshop.date.substring(5,7))) : null,

  }));

  return { data: processedData, isLoading, error };
}
