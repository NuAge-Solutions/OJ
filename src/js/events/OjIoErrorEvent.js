importJs('oj.events.OjErrorEvent');




OJ.extendClass(
    'OjIoErrorEvent', [OjErrorEvent],
    {},
    {
        'IO_ERROR'   : 'onIoError',
        'IO_TIMEOUT' : 'onIoTimeout'
    }
);