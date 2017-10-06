import React from 'react';
import { Link } from 'react-router-dom';


import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const MenuBar = (props) => {

  const Dropdown = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Lista Projektów"
      containerElement={<Link to="/" />}
    />
    <Divider />
    <MenuItem
      primaryText="Nowy Projekt"
      containerElement={<Link to="/projekt/nowy" />}
    />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
  );

  return (
    <AppBar
      title={props.title}
      iconElementLeft={<Dropdown />}
    />
  );
}

export default MenuBar;
