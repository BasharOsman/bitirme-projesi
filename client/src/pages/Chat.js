import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import { Container, Alert } from 'reactstrap';

import { CTX } from '../Chatstore';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: "center"
    },
    flex: {
        display: "flex",
        aliginItems: "center"
    },
    topicsWindow: {
        width: '15%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '85%',
        height: '300px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%',

    },
    marg: {
        margin: '.5rem'
    }
}));



export default function Chat() {
    const classes = useStyles();

    //CTX Store 
    const { allChats, sendChatAction, user } = useContext(CTX);
    const topics = Object.keys(allChats);

    //local state
    const [activeTopic, changeACtiveTopic] = useState(topics[0])
    const [textValue, changeTextValue] = useState('');
    const [alert] = useState(null);

    return (

        <Container>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    Members Chat
                </Typography>
                <Typography component="p">
                    {activeTopic}
                </Typography>
                {alert ? <Alert color="danger">the field is empty</Alert> : null}
                <div className={classes.flex}>
                    <div className={classes.topicsWindow} >
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeACtiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }

                        </List>
                    </div>
                    <div className={classes.chatWindow} >
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i} >
                                    <Chip label={chat.from} className={classes.marg} />
                                    <Typography variant='body1' gutterBottom className={classes.marg}>{chat.msg}</Typography>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className={classes.flex}>
                    <TextField
                        id="standard-basic"
                        label="Write Message"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={(e) => changeTextValue(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                if (!textValue) {

                                } else {
                                    sendChatAction({ from: user, msg: textValue, topic: activeTopic });
                                    changeTextValue('');
                                }
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            if (!textValue) {

                            } else {
                                sendChatAction({ from: user, msg: textValue, topic: activeTopic });
                                changeTextValue('');
                            }
                        }} >
                        send
                         </Button>

                </div>
            </Paper>
        </Container>
    );
}
