window.goatcounter = {
    path: function(p) { return location.host + p },
    endpoint: "https://{{ .Site.params.goatcounter }}.goatcounter.com/count"
};
