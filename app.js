registerSW()
document.addEventListener('DOMContentLoaded', init)

function init() {
    const BEGIN = 1489507200001
    const OFFSET = 1
    const NUMBER_OF_DAY = 100 + OFFSET
    const progress = getProgress(Date.now(), getDays(BEGIN, NUMBER_OF_DAY))
    setProgress(progress, NUMBER_OF_DAY)
    setMeet(BEGIN)

    mountEvent()
}

function mountEvent() {
    const $Walle = document.querySelector('.Walle')
    const $wallpaper = document.querySelector('.Walle__content')

    $Walle.addEventListener('touchstart', toggleWallpaper)

    function toggleWallpaper() {
        $wallpaper.classList.toggle('Walle__content--hide')
    }
}


function getDays(begin, NUMBER_OF_DAY) {
    let result = []
    const beginDate = new Date(begin)
    let n = 0

    while(result.length < NUMBER_OF_DAY) {
        const date = new Date(begin).setDate(beginDate.getDate() + n)
        if (isWeekday(date)) {
            result.push(date)
        }
        n++
    }

    return result
}

function isWeekday(date) {
    const day = new Date(date).getDay()

    return 0 < day && day < 6
}

function getProgress(now, days) {
    return days.findIndex(day => day > now)
}

function setProgress(progress, total) {
    const rest = total - progress
    const $rest = document.querySelector('.Walle__rest')

    $rest.textContent = rest
}

function registerSW() {
    window.addEventListener('load', () => {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        }
    })
}

function setMeet(begin) {
    const $day = document.querySelector('.Walle__day')
    const $hour = document.querySelector('.Walle__hour')
    const $minute = document.querySelector('.Walle__minute')
    const $second = document.querySelector('.Walle__second')

    setInterval(() => {
        const {day, hour, minute, second} = getElapse(begin, Date.now())
        $day.textContent = day
        $hour.textContent = hour
        $minute.textContent = minute
        $second.textContent = second
    }, 100)
}

function getElapse(start, end) {
    const ms = end - start
    const day = ~~(ms / (1000 * 60 * 60 * 24))
    const hour = ~~(ms / (1000 * 60 * 60)) % 24
    const minute = ~~(ms / (1000 * 60)) % 60
    const second = ~~(ms / 1000) % 60

    return {
        day: formatTime(day),
        hour: formatTime(hour),
        minute: formatTime(minute),
        second: formatTime(second),
    }
}

function formatTime(ms) {
    return ms < 10 ? '0' + ms : '' + ms
}

