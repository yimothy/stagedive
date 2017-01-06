import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { removeEvent, getUserEvents } from '../actions/index';
import JournalPhoto from './journal-photo';

class Journal extends Component {
  componentDidMount() {
    //GETS USER EVENTS
      let id = this.props.userInfo.userInfo.id;
      let user = { id };
      this.props.getUserEvents(user);
  }

  render() {
    let journalPhotos = this.props.userInfo.pastEvents.map((event, i) => <JournalPhoto {...this.props} key={event.id} i={i} event={event} /> );
    return (
      <div>
        <h1>Concert Journal</h1>
        <ul className="list-group col-sm-16">
          {journalPhotos}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.getEventComments,
    userInfo: state.userEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getUserEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Journal);
