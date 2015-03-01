
function getMatchData(summonerName, callback) {

}

function sigma(x) {
    return 1 / (1 + exp(-x));
}

/**
 * Dot product between two vectors. If they have
 * different lengths, use the minimum of the two
 * lengths.
 */
function dot(u, v) {
    var k = min(u.length, v.length);
    var res = 0;
    for (var i = 0; i < k; i++) {
        res += u[i] * v[i];
    }
    return res;
}
/**
 * Sends a GET request to the server for a particular classifier, specified by a coefficient
 * vector and an offset value.
 */
function getClassifier(name, callback) {
    $.get("http://localhost:3000/classifier/" + name, function(responseText) {
        var data = JSON.parse(responseText);
        if ("coef" in data && "offset" in data) {
            console.log("SUCCESS!");
            callback(new LogisticClassifier(data["coef"], data["offset"]));
        } else {
            console.log("FAILURE. Error: ");
            console.log(data)
            callback(null);
        }
    });
}

function LogisticClassifier(coef, offset) {
    this.coef = coef;
    this.offset = offset;
}

LogisticClassifier.prototype.predict = function(x) {
    return sigma(dot(x, this.coef) + this.offset);
}