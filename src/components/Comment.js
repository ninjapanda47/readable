import React from "react";
import { Panel, Button, Label, Glyphicon } from "react-bootstrap";

export default function Comment({
  comments,
  deleteComment,
  updateVoteComment,
  editComment
}) {
  return (
    <ul className="commentlist">
      {comments &&
        comments.map(item => (
          <Panel className="comment" key={item.id}>
            <h4>{item.author}</h4>
            <p>{item.body}</p>
            <h4>
              <Label className="vote">{item.voteScore} votes</Label>
              <Glyphicon
                glyph="glyphicon glyphicon-plus"
                onClick={() => {
                  updateVoteComment(item.id, "upVote");
                }}
              />
              <Glyphicon
                glyph="glyphicon glyphicon-minus"
                onClick={() => {
                  updateVoteComment(item.id, "downVote");
                }}
              />
            </h4>
            <Button
              bsStyle="primary"
              bsSize="small"
              className="postbtn"
              onClick={() => {
                editComment(item.id);
              }}
            >
              Edit
            </Button>
            <Button
              bsStyle="danger"
              bsSize="small"
              className="postbtn"
              onClick={() => {
                deleteComment(item.id);
              }}
            >
              Delete
            </Button>
          </Panel>
        ))}
    </ul>
  );
}
