import React from 'react';
import fetch from 'node-fetch';
import Header from './components/Header';
import Content from './components/Content';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hackerData: this.props.list.hits,
      pageNum: 1,
    };
  }

  nextHackerDataRequest = () => {
    const url = `https://hn.algolia.com/api/v1/search?hitsPerPage=50&page=${this.state.pageNum}`;
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          hackerData: data.hits,
          pageNum: this.state.pageNum + 1

        });
      });
  }

  deleteRow = (objectID) => {
    const newhackerdata = this.state.hackerData.filter(fact => fact.objectID !== objectID);
    this.setState({ hackerData: newhackerdata });
  }

  render() {
    const { hackerData } = this.state;
    return (
      <React.Fragment>
        <Header />
        <Content
          list={hackerData}
          deleteRow={this.deleteRow}
        />
        <input id="moreBtn" type="button" value="more" onClick={this.nextHackerDataRequest} />
      </React.Fragment>
    );
  }
}

export default App;
