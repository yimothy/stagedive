import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Explore from 'material-ui/svg-icons/action/explore';
import Home from 'material-ui/svg-icons/action/home';
import Apps from 'material-ui/svg-icons/navigation/apps';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Info from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Auth from '../modules/auth';
import SearchBar from './searchbar';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      open: false,
    };
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
    this.handleLeftNavToggle = this.handleLeftNavToggle.bind(this);
  }

  onClickLogin(event) {
    hashHistory.push('/login');
  }
  onClickSignup(event) {
    hashHistory.push('/signup');
  }
  onClickLogout(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    hashHistory.push('/login');
  }

  handleLeftNavToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const appBarHeight = {
      height: '70px',
    };
    const id = localStorage.getItem('id');
    const divBarStyle = {
      width: 'inherit',
      height: appBarHeight.height,
    }
    const appBarStyle = {
      // display: 'flex',
      // flexDirection: 'row',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      width: '100%',
      height: 'inherit',
      backgroundColor: 'white',

    }
    const searchBarStyle = {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
    }

    const drawerStyle = {
      top: '200px',
      position: 'relative',
    }
    const bottomLeftNavStyle = {
      position: 'absolute',
      width: '100%',
      bottom: '0',
    }
    return (
      <div>
        {Auth.isUserAuthenticated() ? (
          <Drawer
            style={drawerStyle}
            width={180}
            docked={false}
            open={this.state.open}
            zDepth={1}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem style={appBarHeight}></MenuItem>
              <Link to={"/"} style={{ color: 'black' }} onClick={this.handleLeftNavToggle}><MenuItem primaryText='Home' rightIcon={<Home />} /></Link>
              <Link to={`journal/${id}`} style={{ color: 'black' }} onClick={this.handleLeftNavToggle}><MenuItem primaryText='Concert Journal' rightIcon={<Apps />} /></Link>
              <Link to={"explore"} style={{ color: 'black' }} onClick={this.handleLeftNavToggle}><MenuItem primaryText="Explore" rightIcon={<Explore />} /></Link>
            <Divider />
            <Paper style={bottomLeftNavStyle} zDepth={1}>
              <Link to={"account"} style={{ color: 'black' }}><MenuItem onClick={this.handleLeftNavToggle} primaryText="Account" rightIcon={<AccountCircle />} /></Link>
              <MenuItem onClick={this.onClickLogout} primaryText="Sign out" rightIcon={<PowerSetting />} />
              <Link to={"about"} style={{color: 'black'}}><MenuItem onClick={this.handleLeftNavToggle} primaryText="About Us" rightIcon={<Info />}/></Link>
            </Paper>
          </Drawer>
        ) : (
          <Drawer
            style={drawerStyle}
            docked={false}
            width={150}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem style={appBarHeight}></MenuItem>
            <Link to={"login"} style={{ color: 'black' }} onTouchTap={this.handleLeftNavToggle}><MenuItem>Log In</MenuItem></Link>
            <Link to={"signup"} style={{ color: 'black' }} onTouchTap={this.handleLeftNavToggle}><MenuItem>Sign up</MenuItem></Link>
          </Drawer>
        )}
        <div style={divBarStyle}>
          <AppBar
            title="StageDive"
            style={appBarStyle}
            titleStyle={{ color: 'black', fontFamily: 'Oleo Script, cursive', fontSize: '30px'   }}
            onLeftIconButtonTouchTap={this.handleLeftNavToggle}
            iconStyleLeft={{backgroundColor: 'black', zDepth: 800, position:'relative', zIndex:10000}}
            iconElementRight={<a href='https://github.com/testdriventaiwanese/stagedive'><FontIcon className='fa fa-github' primary /></a>}
            iconStyleRight={{marginTop: '22px', position: 'relative', zIndex:10000}}
            >

            <div style={searchBarStyle}>
              {Auth.isUserAuthenticated() ? (
                <SearchBar />
              ) : (
                <div></div>
              )}
            </div>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default NavBar;
