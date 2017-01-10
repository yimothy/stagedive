import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

import { getFriends, unfollow, getOtherUserEvents } from '../actions/index';

class Friends extends Component {
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
    this.props.getFriends();
  }

  renderFriends() {
    if(this.props.friends.length === 0) {
      return (
        <Card zDepth={1}>
          <CardText>
            You're not following any friends!
          </CardText>
          <br />
        </Card>
      )
    }

    return this.props.friends.map((friend, i) => {
      let avatar = <Avatar>{friend.fullname.slice(0,1)}</Avatar>;
      if (friend.profile_photo){
        avatar = <Avatar src={friend.profile_photo} />;
      }
      return (
        <Card key={friend.id} zDepth={1}>
          <IconMenu style={{float:'right'}}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Unfollow"
              secondary
              onTouchTap={this.handleTouchTap}
              onClick={() => this.props.unfollow(friend.id, i)}
              />
              <Snackbar
                open={this.state.open}
                message="Unfollowed"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
          </IconMenu>
          <Link to={`/view/${friend.id}`}>
            <CardHeader
              title={friend.fullname}
              subtitle={friend.email}
              avatar={avatar}
              onClick={() => this.props.getOtherUserEvents(friend)}
            />
          </Link>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Following</h3>
        <div>{this.renderFriends()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.getFriends,
    userInfo: state.userEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFriends, unfollow, getOtherUserEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Friends);
