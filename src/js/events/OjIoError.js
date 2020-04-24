importJs("oj.events.OjError");




OJ.extendClass(
    "OjIoError", [OjError],
    {},
    {
        "IO_CANCEL" : "onIoCancel",
        "IO_ERROR"   : "onIoError",
        "IO_TIMEOUT" : "onIoTimeout"
    }
);