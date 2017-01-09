import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

import { removeEvent, getUserEvents } from '../actions/index';


class EventDetail extends Component {
  constructor(props) {
    super(props);
     this.state = {
       open: false,
     };
   }

   handleTouchTap = () => {
     this.setState({
       open: true,
     });
   };

   handleRequestClose = () => {
     this.setState({
       open: false,
     });
   };
  componentWillMount() {
    console.log("this.props.params:: ", this.props);
    const userid = Number(this.props.params.userId);
    this.props.getUserEvents({id: userid});
  }
  renderEvent() {
    if (!this.props.event.events[0]) {
      return <div>Event Not Listed</div>;
    }
    const eventArr = this.props.event.events.filter((event) => {
      return event.id === Number(this.props.params.eventId);
    });
    const event = eventArr[0];
    console.log('event:: ', event)
    const saleTimes = JSON.parse(event.sale_date);
    const artistInfo = JSON.parse(event.artist_name);
    const imageDiv = {
      width: '45%',
      float: 'center',
      height: '248px',
      margin: '10px',
    };
    const imageStyle = {
      width: '90%',
      height: '90%',
    };
    return (
      <Paper key={event.id} className="list-group-item" zDepth={2}>
        <div style={imageDiv}>
          <img src={event.image} style={imageStyle} alt="event shot" />
        </div>
        <CardActions>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Remove Event"
              secondary
              onTouchTap={this.handleTouchTap}
              onClick={() => this.props.removeEvent(event.tm_id, 0)}
              />
              <Snackbar
                open={this.state.open}
                message="Event Removed"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
          </IconMenu>
        </CardActions>
        <div>
          <h2>{event.name}</h2>
          <p>{artistInfo.name}</p>
          <p>{event.city}</p>
          <p>{event.country}</p>
          <p>Event Date: {event.date}</p>
          <div>
            <h6>Tickets</h6>
            <p>On sale date: {saleTimes.startDateTime}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
          </div>
        </div>
      </Paper>
    );
  }

  render() {
    console.log('this.props.event:: ', this.props.event);
    return (
      <div>
        <h3>Event Details</h3>
        <div className="list-group col-sm-16">
          {this.renderEvent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.userEvents,
  };
}

export default connect(mapStateToProps, { removeEvent, getUserEvents })(EventDetail);
