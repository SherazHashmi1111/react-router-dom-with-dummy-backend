import React from "react";
import { useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetail() {
  const data = useLoaderData();
  const event =  data.event;
  return  <EventItem event={event}/>
}

export default EventDetail;


export async function loader({params}){
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok){
    throw Error('fetching data error')
  } else {
    const resData = await response.json();
    return resData;
  }
}