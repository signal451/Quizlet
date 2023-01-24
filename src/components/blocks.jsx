import React from "react";
import styled from "styled-components";

const Answer = styled.div`
  max-width: 300px;
  max-height: 80px;
  border: 1px solid #4d5b9e;
  border-radius: 50px;
  cursor: pointer;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  margin-right: 0.5rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
`;

const Text = styled.p`
  font-size: 0.9rem;
  margin: 0;
  padding: 0.5rem;
`;

function Block(props) {
  let background_color = props.state ? "#D6DBF5" : "#FFFFFF";
  return (
    <Answer onClick={props.onClick} color={background_color}>
      <Text>{props.value}</Text>
    </Answer>
  );
}

export default Block;
