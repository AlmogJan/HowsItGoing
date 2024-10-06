export const utilService = {
    formatDate,
    formatHour,
    getTxtToShow
}

function formatHour(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit', hour12: false
    })
}
function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString([], {
        day: "numeric", month: "short"
    })
}

function getTxtToShow(txt: string, length: number) {
    if (txt.length < 1) return ""
    if (txt && txt.length <= length) return txt;
    else {
        return txt?.substring(0, length) + "...";
    }
}