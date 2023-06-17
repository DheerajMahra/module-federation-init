import React from 'react';
const Button = React.lazy(() => import("button/App"));

const App = () => {
  return (
    <>
      <div>Host</div>
      <React.Suspense fallback="loading...">
        <Button />
      </React.Suspense>
    </>
  )
}

export default App