import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Link from "react-router-dom/Link";
const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  
const DrawerSelect = () => {
    const classes = useStyles();
    const [state,setState] = useState(false);
    const toggleDrawer = (anchor,open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
    };
    const list = (anchor) => (
        <div
          className={classes.List}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            <ListItem button component={Link} to="/graphs">  
                <ListItemIcon><ShowChartIcon/></ListItemIcon>
                <ListItemText primary="Graphs"/>
            </ListItem>
            <ListItem button component={Link} to="/">  
                <ListItemIcon><TableChartIcon/></ListItemIcon>
                <ListItemText primary="Stats"/>
            </ListItem>
          </List>
        </div>
    );
    return (
        <div>
            {/* <React.Fragment key={'left'}> */}
                <IconButton onClick={toggleDrawer('left', true)} color="inherit"><MenuIcon/></IconButton>
                <Drawer anchor={'left'} open={state} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            {/* </React.Fragment> */}
        </div>
    )
}

export default DrawerSelect