import { api } from "@/app/api/axiox";

export async function fetchAllEventsCached() {
    const cached = sessionStorage.getItem("ragam_events");
    if (cached) {
        console.log("Using cached events data");
        return JSON.parse(cached);
    }

    console.log("Fetching events data from API");

    //Fetch all events with pagination
    const first = await api.get(
        "/api/events?pagination[page]=1&pagination[pageSize]=25&populate=*"
    );

    const { pageCount } = first.data.meta.pagination;
    const requests = [];

    for (let i = 2; i <=pageCount; i++) {
        requests.push(
            api.get(
                `/api/events?pagination[page]=${i}&pagination[pageSize]=25&populate=*`
            )
        );
    }

    const rest = await Promise.all(requests);

    const allEvents = [
        ...first.data.data,
        ...rest.flatMap((res) => res.data.data),
    ];

    // Cache the data in sessionStorage
    sessionStorage.setItem("ragam_events", JSON.stringify(allEvents));

    return allEvents;
}