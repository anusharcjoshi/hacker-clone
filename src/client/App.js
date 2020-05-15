import React from 'react';
import fetch from 'node-fetch';
import Header from './components/Header';
import Content from './components/Content';

// function App(props) {
//   console.log('<<<<<<<<<Props are here>>>>>>>>', props.list.hits);
//   const data = props.list.hits.map((facts, i) => (
//     <li key={i}>{facts.title}</li>
//   ));
//   const myclick = () => {
//     console.log('I clicked');
//   };
//   return (
//     <React.Fragment>
//       <h1>Yo Yo Honey Singh</h1>
//       <ul>
//         {data}
//       </ul>
//       <button onClick={myclick}>Click</button>
//     </React.Fragment>
//   );
// }

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
        console.log('respone---', data);
        this.setState({
          hackerData: data.hits,
          pageNum: this.state.pageNum + 1

        });
      });
  }

  render() {
    // const { list } = this.props;
    const { hackerData } = this.state;
    // this.setState({ hackerData: list.hits });
    console.log(hackerData);
    return (
      <React.Fragment>
        <Header />
        <Content
          list={hackerData}
        />
        {/* {list.hits.map((facts, i) => (
          <li key={i}>{facts.title}</li>
        ))} */}
        <input id="moreBtn" type="button" value="more" onClick={this.nextHackerDataRequest} />
      </React.Fragment>
    );
  }
}

export default App;
