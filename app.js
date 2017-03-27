registerSW()
document.addEventListener('DOMContentLoaded', init)

function init() {
    const BEGIN = 1489507200001
    const NUMBER_OF_DAY = 100
    const progress = getProgress(Date.now(), getDays(BEGIN, NUMBER_OF_DAY))
    setProgress(progress, NUMBER_OF_DAY)

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