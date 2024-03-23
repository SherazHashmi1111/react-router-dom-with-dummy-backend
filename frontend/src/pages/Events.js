import React from "react";
import EventsList from '../components/EventsList'
import { useLoaderData } from "react-router-dom";
function Events() {
  const events = useLoaderData();
  return <EventsList events={events}/>;
}

export default Events;


export async function loader(){
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok){
    throw Error('fetching data error')
  } else {
    const resData = await response.json();
    const events = resData.events;
    return events
  }
}