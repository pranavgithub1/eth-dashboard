import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from "react-router-dom/Link";
import useMediaQuery from '@material-ui/core/useMediaQuery';
const drawerWidth = '121.9px';
const useStyles = makeStyles({
    drawer: {
      width: drawerWidth,
      ['@media (max-width:600px)']: { 
        width: '60px'
      }
    },
    drawerPaper: {
      width: drawerWidth,
      ['@media (max-width:600px)']: { 
        width: '60px'
      }
    },
    listItemText: {
      fontSize: '12px'
    }
  });
  
const DrawerSelect = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <div>
          <Drawer variant="permanent" anchor={'left'} classes={{paper:classes.drawerPaper}} className={classes.drawer}>
            <List>
              <ListItem button component={Link} to="/graphs" >  
                  <ListItemIcon><ShowChartIcon/></ListItemIcon>
                  {matches&&<ListItemText classes={{primary:classes.listItemText}} primary="Graphs"/>}
              </ListItem>
              <ListItem button component={Link} to="/" >  
                  <ListItemIcon><TableChartIcon/></ListItemIcon>
                  {matches&&<ListItemText classes={{primary:classes.listItemText}} primary="Stats"/>}
              </ListItem>
            </List>
          </Drawer>
        </div>
    )
}

export default DrawerSelect