function getIndicators() {
    var boxes = document.querySelectorAll('.checks input[type="checkbox"]')
    var list = []
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            list.push(boxes[i].value)
        }
    }
    return list
}

function buildJson() {
    var t = document.getElementById("ticker").value || "SPY"
    var h = document.getElementById("horizon").value
    var ind = getIndicators()

    var data = {
        request: {
            ticker: t,
            horizon: h,
            indicators: ind,
        },
        result: {
            prediction: "example",
            confidence: 0,
        },
    }

    return JSON.stringify(data, null, 2)
}

window.onload = function () {
    var out = document.getElementById("output")
    var showBtn = document.getElementById("show")
    var clearBtn = document.getElementById("clear")

    showBtn.addEventListener("click", function () {
        out.textContent = buildJson()
    })

    clearBtn.addEventListener("click", function () {
        document.getElementById("ticker").value = ""
        document.getElementById("horizon").selectedIndex = 0
        var boxes = document.querySelectorAll(
            '.checks input[type="checkbox"]'
        )
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].checked = false
        }
        out.textContent =
            '{\n  "message": "Fill the form and click Preview Request"\n}'
    })
}