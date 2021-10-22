"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
var http_1 = __importDefault(require("k6/http"));
var k6_1 = require("k6");
var metrics_1 = require("k6/metrics");
var normalTrend = new metrics_1.Trend('normal');
var concurrentTrend = new metrics_1.Trend('concurrent');
exports.options = {
    duration: '10s',
    vus: 10,
};
function default_1() {
    var url = 'http://192.168.100.17:9001/settlement';
    var requestBodyNormal = JSON.stringify({
        "action": "GET_ALL_SERVICE_REQUEST",
        "query": {
            "Skip": 0,
            "Take": 10,
            "Filters": [],
            "Orders": []
        }
    });
    var paramsNormal = {
        headers: {
            "Content-Type": "application/json",
            "email": "Agus.Richard-EXT@xapiens.id",
            "location": '[{"id":6,"description":"Kariangau"},{"id":7,"description":"Sorong"}]'
        }
    };
    var responseNormal = http_1.default.post(url, requestBodyNormal, paramsNormal);
    normalTrend.add(responseNormal.timings.duration);
    var requestBodyConcurrent = JSON.stringify({
        "action": "GET_ALL_SERVICE_REQUEST",
        "query": {
            "Skip": 0,
            "Take": 10,
            "Filters": [],
            "Orders": []
        }
    });
    var paramsConcurrent = {
        headers: {
            "Content-Type": "application/json",
            "email": "Agus.Richard-EXT@xapiens.id",
            "location": '[{"id":6,"description":"Kariangau"},{"id":7,"description":"Sorong"}]'
        }
    };
    var responseConcurrent = http_1.default.post(url, requestBodyConcurrent, paramsConcurrent);
    concurrentTrend.add(responseConcurrent.timings.duration);
    k6_1.sleep(0.5);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map