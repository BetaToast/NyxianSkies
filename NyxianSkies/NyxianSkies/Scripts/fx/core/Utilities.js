var BetaToast;
(function (BetaToast) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.readAllText = function (filename) {
            var ret = "";
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", filename, false);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        ret = rawFile.responseText;
                    }
                }
            };
            rawFile.send(null);
            return ret;
        };
        Utils.parseXml = function (xml) {
            var dom = (new DOMParser()).parseFromString(xml, "text/xml");
            return dom;
        };
        Utils.xml2json = function (xml) {
            var xmlDoc = this.parseXml(xml);
            var jsonStr = this.json2Str(this.setJsonObj(xmlDoc));
            return JSON.parse(jsonStr);
        };
        Utils.json2Str = function (js_obj) {
            var rejsn = JSON.stringify(js_obj, undefined, 2).replace(/(\\t|\\r|\\n)/g, '').replace(/"",[\n\t\r\s]+""[,]*/g, '').replace(/(\n[\t\s\r]*\n)/g, '').replace(/[\s\t]{2,}""[,]{0,1}/g, '').replace(/"[\s\t]{1,}"[,]{0,1}/g, '').replace(/\[[\t\s]*\]/g, '""');
            return (rejsn.indexOf('"parsererror": {') == -1) ? rejsn : 'Invalid XML format';
        };
        Utils.setJsonObj = function (xml) {
            var js_obj = {};
            if (xml.nodeType == 1) {
                if (xml.attributes.length > 0) {
                    js_obj["attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        js_obj["attributes"][attribute.nodeName] = attribute.value;
                    }
                }
            }
            else if (xml.nodeType == 3) {
                js_obj = xml.nodeValue;
            }
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof (js_obj[nodeName]) == "undefined") {
                        js_obj[nodeName] = this.setJsonObj(item);
                    }
                    else {
                        if (typeof (js_obj[nodeName].push) == "undefined") {
                            var old = js_obj[nodeName];
                            js_obj[nodeName] = [];
                            js_obj[nodeName].push(old);
                        }
                        js_obj[nodeName].push(this.setJsonObj(item));
                    }
                }
            }
            return js_obj;
        };
        return Utils;
    })();
    BetaToast.Utils = Utils;
})(BetaToast || (BetaToast = {}));
//# sourceMappingURL=Utilities.js.map