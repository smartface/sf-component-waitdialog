const extend = require('js-base/core/extend');
const Application = require("sf-core/application");
const Dialog = require("sf-core/ui/dialog");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const WaitDialogDesign = require('library/WaitDialog');

const WaitDialog = extend(WaitDialogDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;
		this.toggleIndicator = toggleIndicator.bind(this);
		this.toggleGifIndicator = toggleGifIndicator.bind(this);
		this.toggleImgIndicator = toggleImgIndicator.bind(this);
		const component = this;
		component.defaultIndicator = getCombinedStyle(".waitDialog").default;
	}
);

function toggleIndicator(bool) {
	this.indicator.dispatch({
		type: "updateUserStyle",
		userStyle: { visible: bool }
	});
}

function toggleGifIndicator(bool) {
	this.gifIndicator.dispatch({
		type: "updateUserStyle",
		userStyle: { visible: bool }
	});
}

function toggleImgIndicator(bool) {
	this.imgIndicator.dispatch({
		type: "updateUserStyle",
		userStyle: { visible: bool }
	});
}

function createDialog() {
	const component = new WaitDialog();
	const waitDialog = new Dialog({
		android: {
			isTransparent: true,
			cancelable: false
		}
	});
	componentContextPatch(waitDialog, `dialogWait`);
	waitDialog.layout.addChild(component, "waitContent", ".waitDialog");
	switch (component.defaultIndicator) {
		case "indicator":
			component.toggleIndicator(true);
			component.toggleGifIndicator(false);
			component.toggleImgIndicator(false);
			break;
		case "gifIndicator":
			component.toggleIndicator(false);
			component.toggleGifIndicator(true);
			component.toggleImgIndicator(false);
			break;
		case "imgIndicator":
			component.toggleIndicator(false);
			component.toggleGifIndicator(false);
			component.toggleImgIndicator(true);
			break;
	}
	waitDialog.layout.applyLayout();
	return waitDialog;
}

WaitDialog.show = () => {
	this.waitDialog = this.waitDialog || createDialog();
	Application.hideKeyboard();
	this.waitDialog.show();
};

WaitDialog.hide = () => {
	this.waitDialog.hide();
};


module.exports = WaitDialog;
