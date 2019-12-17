import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/start"
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	// webix.ready(() => new MyApp().render() );
	webix.ready( ()=>{
		new MyApp().render();
		var login = webix.storage.session.get('login');
		if(!login){
			window.location="/login.html";
		}
		webix.attachEvent("onBeforeAjax",
			function(mode, url, data, request, headers, files, promise){
				headers["Authorization"] = "bearer "+login.token;
				promise.then(
					function(data){
						var responJson = data.json();
						if (responJson.status) {
							webix.message(responJson.pesan);
						} else {
							webix.alert(responJson.pesan);
						}
					},
					function(err){
						webix.alert("Gagal Akses Server");
					}
					); 
			}
			);
	}); 
}