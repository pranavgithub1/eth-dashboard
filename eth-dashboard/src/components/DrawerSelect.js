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
const drawerWidth = '10%';
const useStyles = makeStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    }
  });
  
const DrawerSelect = () => {
    const classes = useStyles();
    return (
        <div>
          <Drawer variant="permanent" anchor={'left'} classes={{paper:classes.drawerPaper}} className={classes.drawer}>
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
          </Drawer>
        </div>
    )
}

export default DrawerSelect