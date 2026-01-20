import http from "k6/http";
import { sleep } from "k6";

export let options = {
    stages: [
        { duration: "1m", target: 50 }, // ramp to 50 users
        { duration: "3m", target: 50 }, // hold
        { duration: "1m", target: 200 }, // spike
    ],
};

export default function() {
    http.get("https://smileupgrade.net/");
}
