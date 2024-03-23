import React from "react";
import {  redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetail() {
  const data = useRouteLoaderData('event-detail');
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

export async function action({request, params}){
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  });
  if(!response.ok){
    return <p>Error adding new event</p>
  }
  return redirect("/events");
}