import React from 'react';

function App(props) {
  console.log('<<<<<<<<<Props are here>>>>>>>>', props.list.hits);
  const data = props.list.hits.map((facts, i) => (
    <li key={i}>{facts.title}</li>
  ));
  const myclick = () => {
    console.log('I clicked');
  };
  return (
    <React.Fragment>
      <h1>Yo Yo Honey Singh</h1>
      <ul>
        {data}
      </ul>
      <button onClick={myclick}>Click</button>
    </React.Fragment>
  );
}

export default App;
