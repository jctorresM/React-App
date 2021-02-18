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
import { getPeople } from '../../axiosApi';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 1200,
        display: "inline-block"
    },
    avatar: {
        height: '60px', 
        width: '60px'
    },
    cardHeader: {
        textAlign: 'left'
    }
}))

const UserCards = props => {
    const classes = useStyles();
    let history = useHistory();
    const [data, setData] = useState();

    useEffect(async () => {
        const people = await getPeople();
        setData(people.data.results);
        return () => {
        }
    }, []);

    const placeHolderAvatar = "https://starrgate.s3.amazonaws.com/users/133ae153256e1907b04cf99410882cb91f52a9bd/profile_d0JcEzw.jpg";

    return (

        <div className={classes.root}>
            <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {data ? data.map(elem => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={data.indexOf(elem)}>
                        <Card>
                            <CardHeader
                                avatar= {<Avatar className={classes.avatar} alt="U" src={elem.picture || placeHolderAvatar} />}
                                title={elem.name}
                                subheader={elem.locationName}
                                titleTypographyProps = {{variant : 'h6'}}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <Typography variant='subtitle1' align='left'>
                                    {elem.professionalHeadline}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => {
                                    history.push(`/profiles/${elem.username}`);
                                }}>
                                    View
                                </Button>
                                <Button size="small" color="primary">
                                    Connect
                                </Button>
                            </CardActions>
                        </Card>
                     </Grid>
                )) : null }
            </Grid>
        </div>

    );
}

export default withRouter(UserCards);