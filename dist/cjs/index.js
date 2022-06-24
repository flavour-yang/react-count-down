'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
        format = format.replace('hh', hours.toString());
    }
    if (format.includes('mm')) {
        format = format.replace('mm', minutes.toString());
    }
    if (format.includes('ss')) {
        format = format.replace('ss', seconds.toString());
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
    const countRef = React.useRef(time);
    // 获取每次 render 的 time
    const timeRender = React.useRef(0);
    // 是否暂停
    const refRun = React.useRef(true);
    // 记录 requestAnimation id
    const refId = React.useRef(0);
    const [renderTime, setRenderTime] = React.useState({
        hour: 0,
        minute: 0,
        secound: 0,
        millisecond: 0
    });
    const dateTime = +new Date();
    const frameTime = () => {
        const endTime = dateTime + countRef.current;
        const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
        const parse = parseTime(getCurrentRemain());
        timeRender.current = getCurrentRemain();
        setRenderTime({ hour: parse.hours, minute: parse.minutes, secound: parse.seconds, millisecond: parse.milliseconds });
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
    React.useEffect(() => {
        requestAnimationFrame(frameTime);
        return () => {
            cancelAnimationFrame(refId.current);
        };
    }, []);
    getTime && getTime(getRenderTime());
    if (renderContent) {
        return renderContent({ time: getRenderTime(), stop, start });
    }
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("span", null,
            format ? (formatTime(format, parseTime(timeRender.current))) : (React__default["default"].createElement("span", null,
                renderTime.hour,
                ":",
                renderTime.minute,
                ":",
                renderTime.secound,
                ":",
                renderTime.millisecond)),
            actionRender ? (actionRender({ start, stop, run: refRun.current })) : (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("button", { onClick: stop }, "stop"),
                React__default["default"].createElement("button", { onClick: start }, "start"))))));
};

exports.CountDown = CountDown;
exports["default"] = CountDown;
//# sourceMappingURL=index.js.map
