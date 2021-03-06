import React from "react";
import ReactDOM from "react-dom";
import ajax from "superagent";
import Events from "./Events";

export default class Calendar extends React.Component{

  calendarID=/* Your Google calendarID, found in your google calendar settings. Remember to set calendar to public */;
  apiKey=/* Your Google calendar apiKey */;

  state = {};
  /* This, when called with the componentDidMount function, sets the state to the response.body of the return Ajax call. */
  setEvents = (a) => {
    this.setState(a);
  }
  componentDidMount = () => {
    /* The Ajax call retrieves the calendar events from my chosen calendarID and apiKey.
       See here for walkthrough: http://fullcalendar.io/docs/google_calendar/
       Wrapping the getMethod in `` enables the use of ${}, which retrieves the string stored in for example calendarID and apiKey.
       */
    ajax.get(`https://www.googleapis.com/calendar/v3/calendars/${this.calendarID}/events?&key=${this.apiKey}`)
      .end((error, response) => {
        if(!error && response ) {
          this.setEvents(response.body);
          console.log("success");
          console.log(this.state);
        } else {
          console.log("Errors: ", error);
        }
      }
    );
  }
  /* Events savedState stores the returned Ajax call in state. */
  render = () => {
    return (
        <div class="calendar">
        <h2>UPCOMING CONCERTS</h2>
        <hr/>
        <Events savedState={this.state.items} />
      </div>
    );
  }
}
