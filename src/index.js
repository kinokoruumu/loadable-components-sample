import React from 'react'
import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import loadable from '@loadable/component'

function extractRouteAction(
  Component
) {
  console.log("extractRouteAction")
  return new Promise(resolve => {
    console.log("resolve")
    renderToStaticMarkup(
      <Component>
        {(m) => {
          console.log(m); // ここが実行されない
          resolve(m)
          return null;
        }}
      </Component>
    );
  });
}

const initialApp = async () => {
  const Hello = loadable(() => import('./Hello'))
  const Moment = loadable.lib(() => import('moment'))
  const library = loadable.lib(() => import('./Hoge'))
  await library.load().then(() => {
    console.log("loaded")
  })
  const res = await extractRouteAction(library)
  console.log(res)

  function App() {
    return (
      <div>
        <div>
          <Hello />
        </div>
        <div>
          <Moment>{({ default: moment }) => moment().format('HH:mm')}</Moment>
        </div>
      </div>
    )
  }

  const root = document.createElement('div')
  document.body.append(root)

  render(<App />, root)
}
initialApp()
