import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox='0 0 280 466'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='110' cy='110' r='110' />
    <rect x='0' y='276' rx='12' ry='12' width='240' height='27' />
    <rect x='0' y='314' rx='12' ry='12' width='240' height='88' />
    <rect x='90' y='410' rx='24' ry='24' width='150' height='45' />
  </ContentLoader>
);

export default Skeleton;
