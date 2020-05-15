import React from 'react';
import './style.css';

const Content = (props) => {
  const { list } = props;
  return (
    <React.Fragment>
      <table>
        {list && list.map((facts, i) => (
          facts.num_comments && (
            <tr key={i}>
              <td>{facts.num_comments}</td>
              <td>{facts.points}</td>
              <td>
                {facts.title}
                {' '}
                by
                {' '}
                {facts.author}
              </td>
            </tr>
          )
        ))}
      </table>
    </React.Fragment>
  );
};

export default Content;
