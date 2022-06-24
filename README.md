# react-count-down
React Hooks count down components

* [Demo](https://flavour-yang.github.io/react-count-down/example)
* [Online](https://codesandbox.io/s/jmjc78)

## Install
```node
npm install react-hooks-count-down
```

## How use
```javascript
import CountDown from 'react-hooks-count-down'
import React from 'react'
const App = () => {
  return <CountDown></CountDown>
}
```
   


##### Props:

details look [Demo](#Demo)
```javascript
{
  // day*hour*minutes*seconds*milliseconds 
  // for example 3 * 24 * 60 * 60 * 1000
  time?: number 
  format?: string // DD hh:mm:ss:ms
  getTime?: (time: Timer) => void // get count down time
  renderContent?: (args: Content) => ReactElement<any, any> | null // custom render count down
  actionRender?: (args: Content) => React.ReactNode
  // action custom 
}
```
## License
MIT