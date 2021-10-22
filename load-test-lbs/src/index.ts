import http from 'k6/http'
import { sleep } from 'k6'
import { Trend } from 'k6/metrics'

const normalTrend = new Trend('normal')
const concurrentTrend = new Trend('concurrent')

export const options = {
    duration: '10s',
    vus: 10,
}

export default function() {
    const url = 'http://192.168.100.17:9001/settlement'

    const requestBodyNormal = JSON.stringify({
        "action": "GET_ALL_SERVICE_REQUEST",
        "query": {
            "Skip": 0,
            "Take": 10,
            "Filters": [],
            "Orders": []
        }
    })

    const paramsNormal = {
        headers: {
            "Content-Type": "application/json",
            "email": "Agus.Richard-EXT@xapiens.id",
            "location": '[{"id":6,"description":"Kariangau"},{"id":7,"description":"Sorong"}]'
        }
    }

    const responseNormal = http.post(url, requestBodyNormal, paramsNormal)
    normalTrend.add(responseNormal.timings.duration)
    
    const requestBodyConcurrent = JSON.stringify({
        "action": "GET_ALL_SERVICE_REQUEST",
        "query": {
            "Skip": 0,
            "Take": 10,
            "Filters": [],
            "Orders": []
        }
    })

    const paramsConcurrent = {
        headers: {
            "Content-Type": "application/json",
            "email": "Agus.Richard-EXT@xapiens.id",
            "location": '[{"id":6,"description":"Kariangau"},{"id":7,"description":"Sorong"}]'
        }
    }

    const responseConcurrent = http.post(url, requestBodyConcurrent, paramsConcurrent)
    concurrentTrend.add(responseConcurrent.timings.duration)
    sleep(0.5)
}