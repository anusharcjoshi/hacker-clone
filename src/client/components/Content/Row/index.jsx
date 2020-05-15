import React from 'react';


export default class Row extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fact: this.props.fact
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fact !== this.props.fact) {
      this.setState({
        fact: newProps.fact
      });
    }
  }

  upVote = () => {
    const newfact = { ...this.state.fact };
    newfact.points += 1;
    this.setState({
      fact: newfact
    });
  }

  render() {
    const { fact } = this.state;
    return (
      <tr key={fact.objectID}>
        <td>{fact.num_comments}</td>
        <td>
          {fact.points}
          {' '}
          <input type="button" value="&#x25B2;" onClick={this.upVote} />
        </td>
        <td>
          {fact.title}
          {' '}
          by
          {' '}
          {fact.author}
        </td>
        <td><input type="button" value="[Hide]" onClick={() => this.props.deleteRow(this.state.fact.objectID)} /></td>
      </tr>
    );
  }
}
