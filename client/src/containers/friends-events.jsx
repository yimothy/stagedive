import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import LinearProgress from 'material-ui/LinearProgress';


import { getFriendsEvents } from '../actions/index';

class FriendsEventList extends Component {
  componentDidMount() {
    this.props.getFriendsEvents();
  }
  renderList() {
    const largestPic = (imageArray) => {
      let largest = 0;
      let index;
      imageArray.forEach((image, i) => {
        if (image.width > largest) {
          largest = image.width;
          index = i;
        }
      });
      return imageArray[index].url;
    };
    if (!this.props.friendsEvents.futureEvents) {
      return (
        <div>
          <LinearProgress mode="indeterminate" />
        </div>
      );
    }
    else if (this.props.friendsEvents.futureEvents.length === 0) {
      return (
        <Card className="list-group-item" zDepth={1}>
          <CardText>
            <span>No upcoming friends from events</span>
            <br />
          </CardText>
        </Card>
      );
    }
    else {
      const userInfo = this.props.friendsEvents.userInfo;
      const friendsEvents = this.props.friendsEvents.friendsEvents;
      return this.props.friendsEvents.futureEvents.map((event) => {
        const eventUser = friendsEvents.filter((friend) => {
          return friend.id_events === event.id;
        }).map(val => val.id_users);
        let user = userInfo.filter((user) => {
          return eventUser.indexOf(user.id) > -1;
        });
        let name = user.map((user) => user.fullname);

        const momentDate = moment(event.date).format('LLLL');
        const momentFromNow = moment(event.date).fromNow();
        const est = moment(event.date)._d;
        const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
        const date = momentDate.toString() + ' ' + est.toString().slice(34);
        let image = null;
        if (event.image) {
          image = largestPic(JSON.parse(event.image)) || null;
        }
        const venue = JSON.parse(event.venue)[0];
        let venueName = null;
        let venueStateOrCountry = null;
        if (venue.state) {
          venueName = venue.state.name;
          venueStateOrCountry = venue.state.stateCode;
        } else if (venue.country) {
          venueName = venue.country.name;
          venueStateOrCountry = venue.country.countryCode;
        }
        return (
          <Card key={event.id} className="list-group-item">
            <CardHeader
              title={ <Link to={`/view/${user[0].id}`} onClick={() => this.props.getUserEvents(user[0])}>{name.join(', ')}</Link>}
              subtitle={`going ${momentFromNow.toString()}`}
              avatar={<Avatar>{name.join(', ').slice(0,1)}</Avatar>}
              onClick={() => this.props.getOtherUserEvents(friend)}
            />
            <CardMedia>
              <img src={image} />
            </CardMedia>
            <CardText>
              <span><strong>Listed acts: </strong>{artist.join(', ')}</span>
              <br />
              <span><strong>Venue: </strong>{venue.name}</span>
              <br />
              <span><strong>Event Start: </strong>{date}</span>
            </CardText>
          </Card>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <div className="list-group col-sm-16">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFriendsEvents }, dispatch);
}


export default connect(null, mapDispatchToProps)(FriendsEventList);
