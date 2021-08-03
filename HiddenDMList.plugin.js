/**
 * @name HiddenDMList
 * @author Xyhlo
 * @authorId 536197278126309397
 * @version 1.0
 * @description a plugin to make direct messages list hidden by clicking the "Direct Messages" text, thanks to TKperson#2348
 * @website https://xhylo.github.io/
 */

const createElement = (type, props, ...children) => {
	const node = document.createElement(type);
	Object.assign(node, props);
	if (children.length) node.append(...children);

	return node;
};

module.exports = class CompactFriends {
	observer(mutations) {
		let container = document.getElementsByClassName(
			'privateChannelsHeaderContainer-3NB1K1 container-2ax-kl'
		)[0];
		let DMContainer = document.getElementsByClassName('content-3YMskv')[0];
		let hiddenDMs = [];
		let hidden = true;

		if (container) {
			container.onclick = function () {
				let DMs = Array.from(
					document.getElementsByClassName('container-2Pjhx-')
				);
				DMs.splice(0, 3);
				if (hidden) {
					hidden = false;
					for (let DM of DMs) {
						DM.style.display = 'none';
						hiddenDMs.push(DM);
					}
					DMContainer.style.height = '100%';
					DMContainer.style.overflow = 'hidden';
				} else {
					hidden = true;
					for (let DM of hiddenDMs) {
						DM.style.display = '';
					}
					hiddenDMs = [];
					DMContainer.style.height = '';
					DMContainer.style.overflow = '';
				}
			};
		}
	}

	start() {}

	stop() {}
};
