import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/'
import Avatar from '@material-ui/core/Avatar';
import { getOpportunities } from '../../axiosApi';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 900,
        display: "inline-block"
    },
    avatar: {
        height: '65px', 
        width: '65px'
    },
    cardHeader: {
        textAlign: 'left'
    },
    card: {
        textAlign: 'left'
    },
    content: {
        marginLeft: 200
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },
}))

const JobList = props => {
    const classes = useStyles();
    let history = useHistory();
    const [data, setData] = useState();

    useEffect(async () => {
        const jobs = await getOpportunities();
        setData(jobs.data.results);
        return () => {
        }
    }, []);

    const placeHolderAvatar = "https://starrgate.s3.amazonaws.com/users/133ae153256e1907b04cf99410882cb91f52a9bd/profile_d0JcEzw.jpg";

    return (

        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                {Array.isArray(data) && data.map((elem, i) => (
                    <Grid item xs={12} sm={11} md={11} lg={10} xl={8}  key={data.indexOf(elem)}>                       
                        <Card className={classes.card}>
                            <Box pl={2} pt={2}>
                                <CardHeader
                                    avatar= {<Avatar className={classes.avatar} alt="U" src={elem.organizations[0].picture || placeHolderAvatar} />}
                                    title={elem.objective}
                                    subheader={elem.organizations[0].name}
                                    titleTypographyProps = {{variant : 'h6'}}
                                    subheaderTypographyProps = {{variant : 'h6'}}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className="content">
                                        <Typography paragraph variant='subtitle1'><strong>Job Type :</strong> {elem.type}</Typography> 
                                        <Typography paragraph variant='subtitle1'><strong>Apply Before :</strong> {elem.deadline}</Typography>
                                    </div>
                                    
                                    <div className={classes.chipContainer}>
                                        {elem.skills.map((skill) => (
                                            <Chip label={skill.name} />
                                        ))}
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => {
                                        history.push(`/opportunities/${elem.id}`);
                                    }}>
                                        <strong> {`Details >>`}</strong> 
                                    </Button>
                                </CardActions>
                            </Box>
                        </Card>
                     </Grid>
                )) }
            </Grid>
        </div>

    );
}

export default withRouter(JobList);