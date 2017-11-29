import React from "react";
import { Panel, Button, Label, Glyphicon } from "react-bootstrap";

export default function Comment({ comments, deleteComment }) {
  return (
    <ul className="commentlist">
      {comments &&
        comments.map(item => (
          <Panel className="comment" key={item.id}>
            <h4>{item.author}</h4>
            <p>{item.body}</p>
            <h4>
              <Label className="vote">{item.voteScore} votes</Label>
              <Glyphicon glyph="glyphicon glyphicon-plus" />
              <Glyphicon glyph="glyphicon glyphicon-minus" />
            </h4>
            <Button bsStyle="primary" bsSize="small" className="postbtn">
              Edit
            </Button>
            <Button bsStyle="danger" bsSize="small" className="postbtn" onClick={() => {console.log(item.id); deleteComment(item.id)}}>
              Delete
            </Button>
          </Panel>
        ))}
    </ul>
  );
}
