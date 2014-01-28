/// <reference path="typings/jquery/jquery.d.ts" />

class MessageInput {
	private _$textElement: JQuery;
	private _$binaryElements: JQuery;

	constructor($textElement: JQuery, $binaryElements: JQuery) {
		this._$textElement = $textElement;
		this._$binaryElements = $binaryElements;

		this._$textElement.bind('keyup', (e) => {
			var code = e.keyCode || e.which;

			if(code == 8) {
				this.remove();
			}
		});

		this._$textElement.bind('keypress', (e) => {
			var code = e.keyCode || e.which;

			console.log(code);

			this.add(String.fromCharCode(code));

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

	private add(char: string) {
		

		var charCode = char.charCodeAt(0);

		console.log(charCode.toString(2));
		var higher = this.pad((charCode >> 4).toString(2), 4);
		var lower = this.pad((charCode & parseInt('0x000f', 16)).toString(2), 4);

		this._$binaryElements.append('<input type="text" maxlength="4" size="4" readonly="readonly" value="' + higher + '" />');
		this._$binaryElements.append('<input type="text" maxlength="4" size="4" readonly="readonly" value="' + lower + '" />');
	}

	private remove() {
		this._$binaryElements.find('input:last()').remove();
		this._$binaryElements.find('input:last()').remove();
		console.log('remove');
	}

	private pad(num, size) {
		var s = num + "";
		while(s.length < size) s = "0" + s;
		return s;
	}
}

$(function() {
	var messageInput = new MessageInput($('#messageText'), $('#messageBinary'));

});