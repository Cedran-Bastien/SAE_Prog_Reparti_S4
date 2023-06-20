const proxy_host = "charlemagne.iutnc.univ-lorraine.fr"
const proxy_port = 34546

export default function fetch_proxy(url) {
    return fetch(url).catch(() => fetch(`http://${proxy_host}:${proxy_port}/?url=${url}`))
}