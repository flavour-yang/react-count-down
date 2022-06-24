/*
 * @Author: Y
 * @Date: 2022-06-10
 * @Description:
 */
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { parseTime, HOUR, formatTime } from '../utils/index'
import type { Timer } from '../utils/index'

interface Content {
	time?: Timer
	start?: () => void
	stop?: () => void
	run?: boolean
}

interface Props {
	time?: number
	format?: string
	getTime?: (time: Timer) => void
	renderContent?: (args: Content) => ReactElement<any, any> | null
	actionRender?: (args: Content) => React.ReactNode
}

export const CountDown: React.FC<Props> = (props) => {
	const { time = HOUR, getTime, renderContent, format, actionRender } = props
	// 暂停时间
	const countRef = useRef(time)
	// 获取每次 render 的 time
	const timeRender = useRef(0)
	// 是否暂停
	const refRun = useRef(true)
	// 记录 requestAnimation id
	const refId = useRef(0)

	const [renderTime, setRenderTime] = useState({
		hour: 0,
		minute: 0,
		secound: 0,
		millisecond: 0
	})

	const dateTime = +new Date()
	const frameTime = () => {
		const endTime = dateTime + countRef.current
		const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)
		const parse = parseTime(getCurrentRemain())

		timeRender.current = getCurrentRemain()

		setRenderTime({ hour: parse.hours, minute: parse.minutes, secound: parse.seconds, millisecond: parse.milliseconds })

		const requestAnimationId = requestAnimationFrame(frameTime)
		refId.current = requestAnimationId
		if (!refRun.current) {
			countRef.current = getCurrentRemain()
			cancelAnimationFrame(refId.current)
			return
		}
	}

	const stop = () => {
		refRun.current = false
	}

	const start = () => {
		if (refRun.current) {
			return
		}
		refRun.current = true
		requestAnimationFrame(frameTime)
	}

	const getRenderTime = () => {
		return parseTime(timeRender.current)
	}

	useEffect(() => {
		requestAnimationFrame(frameTime)
		return () => {
			cancelAnimationFrame(refId.current)
		}
	}, [])

	getTime && getTime(getRenderTime())

	if (renderContent) {
		return renderContent({ time: getRenderTime(), stop, start })
	}

	return (
		<React.Fragment>
			<span>
				{format ? (
					formatTime(format, parseTime(timeRender.current))
				) : (
					<span>
						{renderTime.hour}:{renderTime.minute}:{renderTime.secound}:{renderTime.millisecond}
					</span>
				)}
				{actionRender ? (
					actionRender({ start, stop, run: refRun.current })
				) : (
					<React.Fragment>
						<button onClick={stop}>stop</button>
						<button onClick={start}>start</button>
					</React.Fragment>
				)}
			</span>
		</React.Fragment>
	)
}

export default CountDown
