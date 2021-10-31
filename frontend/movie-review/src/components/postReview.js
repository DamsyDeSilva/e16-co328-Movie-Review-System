import { React, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextareaAutosize, Button } from '@material-ui/core';
import { Rating, } from '@material-ui/lab';
import { baseUrl } from "../shared/baseUrl";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: 30,
        color: "#AEB7BF",
        margin: 15
    },
    rating: {
        marginLeft: 75,
        marginRight: 100,
    },
    reviewBox: {
        maxWidth: 700,
        fontSize: 20,
        fontWeight: "bolder",
        width: "250%",
        background: "#1B3659",
        border: "none",
        padding: 15,
        color: "#AEB7BF",
        borderRadius: 30,
        letterSpacing: 1,
        wordSpacing: 7,
        [theme.breakpoints.down('sm')]: {
            width: "100%"
        },
        '&:focus': {
            outline: "none"
        }
    },
    postButton: {
        background: "transparent",
        border: "2px solid white",
        color: "#AEB7BF",
        fontWeight: "bolder",
        borderRadius: 17,
        marginLeft: 200,
    },
    disabledButton: {
        borderColor: "#AEB7BF"
    }
}));

function postReview(rating, review, type) {
    var id;
    var authorId = (JSON.parse(window.localStorage.getItem("user")))._id
    var token = window.localStorage.getItem("token");
    var newReview;

    if (type === "movie") {
        id = window.location.pathname.substring(7);
        newReview = {
            authorId: authorId,
            content: review,
            rating: rating
        };


        fetch(baseUrl + "movie-review/" + id, {
            method: "POST",
            body: JSON.stringify(newReview),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })

            .then(alert("Your Review Posted"))
            .catch();
    }
    else if (type === "people") {
        id = window.location.pathname.substring(8)

        newReview = {
            authorId: authorId,
            content: review,
            rating: rating
        }

        fetch(baseUrl + "cast-review/" + id, {
            method: "POST",
            body: JSON.stringify(newReview),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => console.log(response))
            .then(alert("Your Review Posted"))
            .catch();
    }
}

export default function PostReview(props) {
    const classes = useStyles();
    const [review, setReview] = useState(window.localStorage.getItem("review") || "");
    const [rating, setRating] = useState(5);
    var isLoggedIn = window.localStorage.getItem("token") ? true : false;

    return (
        <div>
            <Typography className={classes.heading}>Post Review</Typography>
            <TextareaAutosize
                disabled={!isLoggedIn}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={300}
                className={classes.reviewBox}
                boxshadow={3}
                minRows={6}
                placeholder={isLoggedIn ? "Write Your Review Here ..." : "Please Log In to Write Your Review Here ..."} />
            <Rating button value={rating} onChange={(e, rtg) => setRating(rtg)} className={classes.rating} />
            <Button className={classes.postButton} onClick={() => postReview(rating, review, props.type)}>Post Review</Button>
        </div>
    );
}