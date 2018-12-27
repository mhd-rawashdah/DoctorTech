import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import logo from '../../../../image/chief2.jpg'
import patientlogo from '../../../../image/patientlogo.jpg'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {GetUserInformation} from '../../../../store/action/patientAction'


//Note:page style
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        marginLeft: 0,
        marginTop: 50,
    },
    inline: {
        display: 'inline',
    },
    img: {
        borderRadius: '50%',
        width: 150,
        height: 150,
        

    },
    list:{
        paddingTop: '20px',
    }
});



class PatientCard extends React.Component {

    state = {
        complaint: [{
            id: 1,
            Name: 'Walid HAj Hussien',
            gender: " Male",
            Age:'27',
            Gender: 'Male'
        }]
    }


    componentDidMount() {
        var Id=this.props.id
        console.log('Case',Id)
        this.props.GetPationInformation(Id)
    }


    render() {
        const { classes } = this.props;
        
        return (
            <List className={classes.root}>
                {this.state.complaint.map((value, key) => {
                    return (
                         <div>
                             
                        <ListItem alignItems="flex-start" key={key} >
                            <ListItemAvatar >
                            <Avatar alt="Remy Sharp" src={patientlogo} title={value.date} className={classes.img} />
                            
                            </ListItemAvatar>
                            <ListItemText
                            className={classes.list}
                                primary={value.Name}
                                secondary={
                                    
                                    <React.Fragment className={classes.fragment}>
                                    <br/> 
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                           Gender&nbsp;&nbsp;&nbsp;:&nbsp;   
                                          </Typography>
                                        {value.gender}
                                        <br/>
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                           Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                          </Typography>
                                        {value.Age}
                                        <br/>
                                        <Typography component="span" className={classes.inline} color="textPrimary">
                                        Gender&nbsp;&nbsp;:&nbsp;&nbsp;
                                          </Typography>
                                        {value.Gender}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        
                        </div>   
                        


                    )

                })}

            </List>
        );
    }


}

PatientCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


//Note:add the redux state to the props
const mapStateToProps = (state) => {
    return {
      patient: state
    }
  }
  
  //Note: add the action to the props
  const mapDispatchToProps = (dispatch) => {
    return {
      GetPationInformation: (id) => dispatch(GetUserInformation(id))
    }
  }



export default compose(withStyles(styles),connect(mapStateToProps,mapDispatchToProps))(PatientCard);