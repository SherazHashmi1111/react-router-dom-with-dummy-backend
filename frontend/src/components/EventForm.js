import { Form, redirect, useNavigate } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : undefined}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : undefined}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : undefined}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : undefined}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    date: data.get("date"),
    image: data.get("image"),
    description: data.get("description"),
  };
  let url =  'http://localhost:8080/events/'
  if(request.method === 'PATCH'){
    const id = params.eventId;
    url = 'http://localhost:8080/events/' + id
  }
  const response = await fetch(url, {
    method: request.method,
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

