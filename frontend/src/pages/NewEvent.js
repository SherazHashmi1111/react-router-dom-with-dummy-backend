import React from "react";
import EventForm from "../components/EventForm";
import { redirect } from "react-router-dom";

function NewEvent() {
  return <EventForm />;
}

export default NewEvent;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    date: data.get("date"),
    image: data.get("image"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if(!response.ok){
    return <p>Error adding new event</p>
  }
  return redirect("/events");
}
