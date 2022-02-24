/**
 * @name HiddenDMList
 * @author Xyhlo
 * @authorId 536197278126309397
 * @version 1.0.0
 * @description a plugin to make direct messages list hidden by clicking the "Direct Messages" text, thanks to TKperson#2348
 * @website https://xhylo.github.io/
 */

 const ListSectionItem = BdApi.findModule(m => m.default?.displayName === "ListSectionItem")
 let isHidden = false
 const dmClass = BdApi.findModuleByProps("privateChannelsHeaderContainer").privateChannelsHeaderContainer
 
 const hideDMListButton = BdApi.React.memo(() => {
   const [hidden, _setHidden] = BdApi.React.useState(isHidden)
 
   function setHidden(val) {
	 isHidden = val
	 
	 if (val) BdApi.injectCSS("HiddenDMList", `.${dmClass} ~ li { display: none }`)
	 else BdApi.clearCSS("HiddenDMList")
 
	 return _setHidden(val)
   }
 
   return BdApi.React.createElement("div", {
	 onClick: () => setHidden(!hidden)
   }, hidden ? "Show" : "Hide")
 })
 
 function getOwnerInstance(element) {
   for (let RI = BdApi.getInternalInstance(element); RI; RI = RI.return) {
	 const sn = RI.stateNode
	 if (typeof sn?.forceUpdate === "function") return sn
   }
 }
 
 function forceUpdate() { return getOwnerInstance(document.querySelector(`.${dmClass}`)).forceUpdate() }
 
 module.exports = class {
   start() {
	 BdApi.Patcher.after("HiddenDMList", ListSectionItem, "default", (that, args, res) => {
	   if (!res.props.className.startsWith(dmClass)) return
	   res.props.children.splice(1, 0, BdApi.React.createElement(hideDMListButton, { key: "HiddenDMList" }))
	 })
	 if(global.ZeresPluginLibrary != null) 
      global.ZeresPluginLibrary.PluginUpdater.checkForUpdate(this.getName(), "1.0.0", "https://raw.githubusercontent.com/doggybootsy/BDPlugins/main/BackupCustomCSS/BackupCustomCSS.plugin.js")
	 forceUpdate()
   }
   
   stop() {
	 BdApi.Patcher.unpatchAll("HiddenDMList")
	 forceUpdate()
	 isHidden = false
	 BdApi.clearCSS("HiddenDMList")
   }
 }
