/*
 * @Author: Y
 * @Date: 2022-06-10
 * @Description:
 */
const { CountDown, React, ReactDOM } = window

const App = () => {
	return (
		<React.Fragment>
			<CountDown></CountDown>
		</React.Fragment>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))
