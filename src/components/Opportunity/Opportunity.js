import React, { useState, useEffect } from 'react';
import { getOpportunity } from '../../axiosApi';
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

const Opportunity = () => {
    const [data, setData] = useState();
    const classes = useStyles();

    useEffect(async () => {
        const { id } = useParams();
        const opportunity = await getOpportunity(id || "VWYgbvdN");
        console.log(opportunity);
        setData(opportunity.data);
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {data && 
                        <Card className={classes.card}>
                            <Box pl={2}>
                                <CardHeader
                                    avatar= {<Avatar className={classes.avatar} alt="U" src={data.organizations[0].picture} />}
                                    title={data.objective}
                                    subheader={data.organizations[0].name}
                                    titleTypographyProps = {{variant : 'h5'}}
                                    subheaderTypographyProps = {{variant : 'h6'}}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <Box pl={2} pb={2}>
                                        <Typography paragraph align="left" variant='subtitle1'>
                                            <strong>Compensation : </strong> 
                                            {`${data.compensation.currency} ${data.compensation.minAmount} - ${data.compensation.maxAmount} ${data.compensation.periodicity}`}
                                        </Typography> 
                                        <Typography paragraph align="left" variant='subtitle1'><strong>Apply Before : </strong> {data.deadline}</Typography>
                                    </Box>
                                    
                                    <div className={classes.chipContainer}>
                                        {data.strengths.map((skill) => (
                                            <Chip label={skill.name} />
                                        ))}
                                    </div>
                                </CardContent>
                            </Box>
                        </Card>
                    }
                </Grid>
                <Grid item xs={12}>
                    {data && 
                        <Paper className={classes.paper}>
                            <Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} variant='h6' align='left'>
                                    <strong>Job Description</strong>     
                                </Typography>
                                {
                                    data.details.filter(x => x.code === 'reason').map((item) => (
                                        <>
                                            <Box pt={2}></Box>
                                            {item.content.split("\n").map((p) => (
                                                <Typography paragraph  variant='subtitle1' align='left'>
                                                    {p}
                                                </Typography>
                                            ))}

                                        </>
                                    ))
                                }
                            </Box>
                            <Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} variant='h6' align='left'>
                                    <strong>Responsabilities</strong>     
                                </Typography>
                                {
                                    data.details.filter(x => x.code === 'responsibilities').map((item) => (
                                        <>
                                            <Box pt={2}></Box>
                                            {item.content.split("\n").map((p) => (
                                                <Typography paragraph  variant='subtitle1' align='left'>
                                                    {p}
                                                </Typography>
                                            ))}
                                        </>
                                    ))
                                }
                            </Box>
                            <Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} variant='h6' align='left'>
                                    <strong>Requirements</strong>     
                                </Typography>
                                {
                                    data.details.filter(x => x.code === 'requirements').map((item) => (
                                        <>
                                            <Box pt={2}></Box>
                                            {item.content.split("\n").map((p) => (
                                                <Typography paragraph  variant='subtitle1' align='left'>
                                                    {p}
                                                </Typography>
                                            ))}
                                        </>
                                    ))
                                }
                            </Box>
                            <Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} variant='h6' align='left'>
                                    <strong>Benefits</strong>     
                                </Typography>
                                {
                                    data.details.filter(x => x.code === 'benefits').map((item) => (
                                        <>
                                            <Box pt={2}></Box>
                                            <Typography paragraph  variant='subtitle1' align='left'>
                                                - {item.content}
                                            </Typography>
                                        </>
                                    ))
                                }
                            </Box>
                            <Box pl={2} pr={1} pt={1}>
                                <Typography pl={1} variant='h6' align='left'>
                                    <strong>About {data.organizations[0].name}</strong>     
                                </Typography>
                                {
                                    data.details.filter(x => x.code === 'organizations').map((item) => (
                                        <>
                                            <Box pt={2}></Box>
                                            {item.content.split("\n").map((p) => (
                                                <Typography paragraph  variant='subtitle1' align='left'>
                                                    {p}
                                                </Typography>
                                            ))}
                                        </>
                                    ))
                                }
                            </Box>
                        </Paper>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default Opportunity;