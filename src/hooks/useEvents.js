// Hooks for events
import { useState, useEffect } from "react";
import { api } from "@/app/api/axiox";

//Docs

/**
 * @param {string} eventType - The type of events to fetch (default: "events")
 * @returns {Object} An object containing the events, loading state, and error (if any)
 * @example
 * const { events, isLoading, error } = useEvents("events");
 * @author Vinit K
 */

export function useEvents(eventType="events") {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getEvents = async () => {
        try {
          const response = await api.get(`/api/${eventType}`);
          setData(response.data.data);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      getEvents();
    }, []);

    const processedData = data.map(event => ({
      ...event,
      // Just passing the day part of the date to the EventCard, since that's all it needs
      eventDay: event.date ? event.date.substring(8,10) : null,
    }));

    return { data: processedData, isLoading, error };
}
