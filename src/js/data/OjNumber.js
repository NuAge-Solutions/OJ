// math functions
if(!Math.signedCeil){
    Math.signedCeil = function(num){
        if(num < 0){
            return Math.floor(num);
        }

        return Math.ceil(num);
    };
}

if(!Math.signedFloor){
    Math.signedFloor = function(num){
        if(num < 0){
            return Math.ceil(num);
        }

        return Math.floor(num);
    }
}

if(!Math.bounds){
    Math.bounds = function(num, min, max){
        return Math.min(Math.max(min, num), max)
    }
}


// number functions
var proto = Number.prototype;

proto.oldToString = proto.toString();

if(!proto.toFormattedString){
    proto.toFormattedString = function(num_digits, num_decimals){
        var str = '',
            parts = this.valueOf().split('.');

        if(num_digits){
            for(; parts[0].length < num_digits;){
                parts[0] = '0' + parts[0];
            }

            str = parts[0];
        }

        if(num_decimals){
            str += '.';

            for(; parts[1].length < num_decimals;){
                parts[1] += '0';
            }

            str += parts[1];
        }

        return str;
    };
}