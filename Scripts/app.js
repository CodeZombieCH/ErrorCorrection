/// <reference path="typings/jquery/jquery.d.ts" />
var MessageInput = (function () {
    function MessageInput($textElement, $binaryElements) {
        var _this = this;
        this._$textElement = $textElement;
        this._$binaryElements = $binaryElements;

        this._$textElement.bind('keyup', function (e) {
            var code = e.keyCode || e.which;

            if (code == 8) {
                _this.remove();
            }
        });

        this._$textElement.bind('keypress', function (e) {
            var code = e.keyCode || e.which;

            console.log(code);

            _this.add(String.fromCharCode(code));
        });
        /*
        console.log(e);
        if(code == 13) {
        alert('foo');
        }
        
        if(code == 8) {
        this.remove();
        }
        */
    }
    MessageInput.prototype.add = function (char) {
        var charCode = char.charCodeAt(0);

        console.log(charCode.toString(2));
        var higher = this.pad((charCode >> 4).toString(2), 4);
        var lower = this.pad((charCode & parseInt('0x000f', 16)).toString(2), 4);

        this._$binaryElements.append('<input type="text" maxlength="4" size="4" readonly="readonly" value="' + higher + '" />');
        this._$binaryElements.append('<input type="text" maxlength="4" size="4" readonly="readonly" value="' + lower + '" />');
    };

    MessageInput.prototype.remove = function () {
        this._$binaryElements.find('input:last()').remove();
        this._$binaryElements.find('input:last()').remove();
        console.log('remove');
    };

    MessageInput.prototype.pad = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    return MessageInput;
})();

$(function () {
    var messageInput = new MessageInput($('#messageText'), $('#messageBinary'));
});
//# sourceMappingURL=app.js.map
