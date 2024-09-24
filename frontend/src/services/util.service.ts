export const utilService = {
    formatDate,
    formatHour
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