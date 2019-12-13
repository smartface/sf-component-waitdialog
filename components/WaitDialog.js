const extend = require('js-base/core/extend');
const Application = require("sf-core/application");
const Dialog = require("sf-core/ui/dialog");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const ActivityIndicator = require('sf-core/ui/activityindicator');
const GifImageView = require('sf-core/ui/gifimageview');
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const WaitDialogDesign = require('library/WaitDialog');

const WaitDialog = extend(WaitDialogDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;
		const component = this;
		component.defaultIndicator = getCombinedStyle(".waitDialog").default;
	}
);

function createDialog() {
	const component = new WaitDialog();
	const waitDialog = new Dialog({
		android: {
			isTransparent: true,
			cancelable: false
		}
	});
	componentContextPatch(waitDialog, `dialogWait`);
	waitDialog.layout.addChild(component, "component");

	let isNormalIndicator = component.defaultIndicator === "activityIndicator";
	if (isNormalIndicator) {
		let activityIndicator = new ActivityIndicator();
		component.addChild(activityIndicator, "activityIndicator");
		activityIndicator.dispatch({
			type: "pushClassNames",
			classNames: [`.waitDialog-${component.defaultIndicator}`]
		});
	}
	else {
		let gifImageIndicator = new GifImageView();
		component.addChild(gifImageIndicator, "gifImageIndicator");
		gifImageIndicator.dispatch({
			type: "pushClassNames",
			classNames: [`.waitDialog-${component.defaultIndicator}`]
		});
	}

	waitDialog.dispatch({
		type: "pushClassNames",
		classNames: [".waitDialog"]
	});
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
