import * as React from 'react';

// SSR Fetch
// import fetch from 'isomorphic-unfetch';

type IIndexProps = {
  name: string;
}

const index = (props: IIndexProps) => {
  /* props */
  const { name } = props;

  return (
    <div>
      <h1>{name}</h1>
      hello samplec
    </div>
  );
};

// ServerSideRendering;
index.getInitialProps = () => {
  // fetch
  return { name: 'hello' }
}

export default index;