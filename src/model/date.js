

export default {
    // Date.now() 
    /**
     * @params 
     * v - 时间戳 - 毫秒
     * ch - 年份分割符
     */
    format: (v, ymd, hms) => {

        var ymd = ymd && ymd.length == 3 ? ymd : ["/", "/", ""], hms = hms && hms.length == 3 ? hms : [":", ":", ""];
        var date = new Date(parseInt(v)).toLocaleString(),
            yearList = date.split(" ")[0].split("/"),
            year = yearList[0] + ymd[0] + yearList[1] + ymd[1] + yearList[2] + ymd[2],
            time = date.split(" ")[1],
            half = time.slice(0, 2) == "下午" ? 12 : -12,
            timeList = time.slice(2).split(':'),
            time = parseInt(timeList[0]) + half + hms[0] + timeList[1] + hms[1] + timeList[2] + hms[2];
        return year + " " + time
        // year.split("/").join(ch)
        // year.replace(/\//g,ch)
        // year.replace(new RegExp("/","gm"),ch)
    },
    dateDiff: timestamp => {
        // 补全为13位
        var arrTimestamp = (timestamp + '').split('');
        for (var start = 0; start < 13; start++) {
            if (!arrTimestamp[start]) {
                arrTimestamp[start] = '0';
            }
        }
        timestamp = arrTimestamp.join('') * 1;

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - timestamp;

        // 如果本地时间反而小于变量时间
        if (diffValue < 0) {
            return '不久前';
        }

        // 计算差异时间的量级
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;

        // 数值补0方法
        var zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };

        // 使用
        if (monthC > 12) {
            // 超过1年，直接显示年月日
            return (function () {
                var date = new Date(timestamp);
                return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
            })();
        } else if (monthC >= 1) {
            return parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            return parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return parseInt(minC) + "分钟前";
        }
        return '刚刚';
    }
}




