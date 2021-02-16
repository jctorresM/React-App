import React, { useState, useEffect } from 'react';
import { getProfile } from '../../axiosApi';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        marginRight: 20
    },
    cardHeader: {
        textAlign: 'left'
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },
  }));

const Profile = props => {
    const { id } = useParams();
    const [data, setData] = useState();
    const classes = useStyles();

    useEffect(async () => {
        const profile = await getProfile(id || "jctorresmorales90");
        setData(profile.data);
    }, []);

    const placeHolderAvatar = "https://starrgate.s3.amazonaws.com/users/133ae153256e1907b04cf99410882cb91f52a9bd/profile_d0JcEzw.jpg";

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {data && 
                    <Card>
                        <Box pl={2} pt={1}>
                            <CardHeader
                                avatar= {<Avatar className={classes.avatar} alt="U" src={data.person.picture || placeHolderAvatar} />}
                                title={data.person.name}
                                subheader={data.person.professionalHeadline}
                                titleTypographyProps = {{variant : 'h4'}}
                                subheaderTypographyProps = {{variant : 'h6'}}
                                className={classes.cardHeader}
                            />
                            
                            <CardContent>               
                                { data.person.summaryOfBio &&
                                    <>
                                        <Divider></Divider>
                                        <Box pl={2} pt={2}>
                                            <Typography pl={1} paragraph variant='h6' align='left'>
                                                <strong>Summary</strong>
                                            </Typography>
                                            <Typography pl={1} paragraph  align='left'>
                                                {data.person.summaryOfBio}
                                            </Typography>
                                        </Box>
                                    </>
                                }   
                                
                            </CardContent>
                        </Box>
                    </Card>}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    {data && 
                        <Paper className={classes.paper}>
                            <Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} paragraph variant='h6' align='left'>
                                    <strong>Résumé</strong>     
                                </Typography>
                                {
                                    data.jobs.map((exp) => (
                                        <>
                                            <Divider ></Divider>
                                            <Box pt={2}></Box>
                                            <Typography  variant='subtitle1' align='left'>
                                                <strong>{exp.name}</strong>
                                            </Typography>
                                            <Typography variant='subtitle2' align='left'>
                                            {exp.organizations[0] && <strong>{exp.organizations[0].name}</strong>}
                                            </Typography>
                                            <Typography paragraph variant='subtitle2' align='left'>
                                                { exp.toYear ?
                                                    <strong>{`${exp.fromMonth} ${exp.fromYear} - ${exp.toMonth} ${exp.toYear}`}</strong>
                                                    :
                                                    <strong>{`${exp.fromMonth} ${exp.fromYear} - now`}</strong>
                                                }
                                            </Typography>
                                            {
                                                exp && exp.responsibilities.map((resp) => (
                                                    <Typography paragraph variant='body1' align='justify'>
                                                        - {resp}
                                                    </Typography>
                                                ))
                                            } 
                                        </>
                                    ))
                                }
                            </Box>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    { data && 
                        <Paper className={classes.paper}>
                            < Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} paragraph variant='h6' align='left'>
                                    <strong>Skills</strong>     
                                </Typography>
                                <Divider ></Divider>
                                <Box pt={2}></Box>
                                <div className={classes.chipContainer}>
                                    {
                                        data.strengths.map((s) => (
                                            <Chip label={s.name} />
                                        ))
                                    }
                                </div>
                            </Box>
                        </Paper>
                    }
                </Grid>
            </Grid>
        </div>
    );
} 

export default Profile;