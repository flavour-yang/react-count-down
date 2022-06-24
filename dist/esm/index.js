import React, { useRef, useState, useEffect } from 'react';

/*
 * @Author: Y
 * @Date: 2022-06-10
 * @Description: 时间格式
 */
const MILLISECOND = 1000;
const SECOND = 1 * MILLISECOND;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const parseTime = (time) => {
    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);
    return {
        total: time,
        days,
        hours,
        minutes,
        seconds,
        milliseconds
    };
};
const formatTime = (format, currentTime) => {
    const { days, hours, minutes, seconds, milliseconds } = currentTime;
    if (format.includes('DD')) {
        format = format.replace('DD', padZero(days.toString()));
    }
    if (format.includes('hh')) {
        format = format.replace('hh', padZero(hours.toString()));
    }
    if (format.includes('mm')) {
        format = format.replace('mm', padZero(minutes.toString()));
    }
    if (format.includes('ss')) {
        format = format.replace('ss', padZero(seconds.toString()));
    }
    if (format.includes('ms')) {
        const strMilliseconds = milliseconds.toString().slice(0, 2);
        format = format.replace('ms', padZero(strMilliseconds));
    }
    return format;
};
function padZero(num, targetLength = 2) {
    let str = num + '';
    while (str.length < targetLength) {
        str = '0' + str;
    }
    return str;
}

/*
 * @Author: Y
 * @Date: 2022-06-10
 * @Description:
 */
const CountDown = (props) => {
    const { time = HOUR, getTime, renderContent, format, actionRender } = props;
    // 暂停时间
    const countRef = useRef(time);
    // 获取每次 render 的 time
    const timeRender = useRef(0);
    // 是否暂停
    const refRun = useRef(true);
    // 记录 requestAnimation id
    const refId = useRef(0);
    const [renderTime, setRenderTime] = useState({
        hour: '0',
        minute: '0',
        secound: '0',
        millisecond: '0'
    });
    const dateTime = +new Date();
    const frameTime = () => {
        const endTime = dateTime + countRef.current;
        const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
        const parse = parseTime(getCurrentRemain());
        timeRender.current = getCurrentRemain();
        setRenderTime({ hour: padZero(parse.hours), minute: padZero(parse.minutes), secound: padZero(parse.seconds), millisecond: padZero(parse.milliseconds, 3) });
        const requestAnimationId = requestAnimationFrame(frameTime);
        refId.current = requestAnimationId;
        if (!refRun.current) {
            countRef.current = getCurrentRemain();
            cancelAnimationFrame(refId.current);
            return;
        }
    };
    const stop = () => {
        refRun.current = false;
    };
    const start = () => {
        if (refRun.current) {
            return;
        }
        refRun.current = true;
        requestAnimationFrame(frameTime);
    };
    const getRenderTime = () => {
        return parseTime(timeRender.current);
    };
    useEffect(() => {
        requestAnimationFrame(frameTime);
        return () => {
            cancelAnimationFrame(refId.current);
        };
    }, []);
    getTime && getTime(getRenderTime());
    if (renderContent) {
        return renderContent({ time: getRenderTime(), stop, start });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("span", null,
            format ? (formatTime(format, parseTime(timeRender.current))) : (React.createElement("span", null,
                renderTime.hour,
                ":",
                renderTime.minute,
                ":",
                renderTime.secound,
                ":",
                renderTime.millisecond)),
            actionRender ? (actionRender({ start, stop, run: refRun.current })) : (React.createElement(React.Fragment, null,
                React.createElement("button", { onClick: stop }, "stop"),
                React.createElement("button", { onClick: start }, "start"))))));
};

export { CountDown as default };
//# sourceMappingURL=index.js.map
