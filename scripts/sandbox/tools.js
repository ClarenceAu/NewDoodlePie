Core.registerModule("undo", function(sandBox) {
	
	var container = null;
	var undoDiv = null, resetDiv = null;

	return {
		init: function() {
			container = sandBox.container;
			sandBox.show(container);
			sandBox.addClass(container, "undoContainer");

			undoDiv = sandBox.createElement("div");
			sandBox.addClass(undoDiv, "undo");

			resetDiv = sandBox.createElement("div");
			sandBox.addClass(resetDiv, "reset");

			container.appendChild(undoDiv);
			container.appendChild(resetDiv);

			undoDiv.onclick = function(e) {
				sandBox.notify({
					"type": "undo"
				});
			};

			resetDiv.onclick = function(e) {
				sandBox.notify({
					"type": "reset"		
				});
			};

			if(sandBox.touchable()) {
	           	undoDiv.addEventListener("touchstart", function(evt) {
	           		sandBox.notify({
						"type": "undo"
					});
	           	});
	           	resetDiv.addEventListener("touchstart", function(evt) {
	           		sandBox.notify({
						"type": "reset"		
					});
	           	});
	        }
		},

		destroy: function() {
			sandBox.hide(container);
			container.removeChild(undoDiv);
			container.removeChild(resetDiv);
		}
	};
});

Core.registerModule("home", function(sandBox) {
	
	var container = null;
	var title = null;

	return {
		init: function() {
			container = sandBox.container;
			sandBox.show(container);

			container.onclick = function() {
				sandBox.notify({
					"type": "home"
				});
			}

			if(sandBox.touchable()) {
				container.addEventListener("touchstart", function(evt) {
					sandBox.notify({
						"type": "home"
					});
				});
			}
		},
		destroy: function() {}
	};
});

Core.registerModule("stamp", function(sandBox) {
	var container = null;
	var stampsList = [ "ball", "flower", "heart", "music", "star" ];
	var stampDivList = [], selectedStamp = null;

	return {
		init: function() {
			container = sandBox.container;
			sandBox.show(container);
			sandBox.addClass(container, "stampList");

			for (var i = 0; i < stampsList.length; i++) {
                var stamp = stampsList[i];

                var stampDiv = sandBox.createElement("div");
                sandBox.addClass(stampDiv, "stamp");
                sandBox.addClass(stampDiv, "unselected");
                sandBox.css(stampDiv, "left", (65 + i * 116));
                sandBox.css(stampDiv, "background", "url(images/stamps/"+stamp+".png) no-repeat");
                stampDiv.setAttribute("stamp", stamp);
                container.appendChild(stampDiv);
    				
                stampDivList.push(stampDiv);
                stampDiv.onclick = this.onclick();
                if(sandBox.touchable()) {
	            	stampDiv.addEventListener("touchstart", this.touchStart());
	        	}
            }

            sandBox.listen( { "colorChange" : this.clearStamp } );
		},

		onclick: function() {
			var parent = this;
			return function(evt) {
				var targetStamp = evt.target;

				if(selectedStamp) {
					sandBox.removeClass(selectedStamp, "selected");
					sandBox.addClass(selectedStamp, "unselected");
				}

				selectedStamp = targetStamp;

				sandBox.removeClass(selectedStamp, "unselected");
				sandBox.addClass(selectedStamp, "selected");

				sandBox.notify({
					"type": "stampChange",
					"data": targetStamp.getAttribute("stamp")
				});
			};
		},

		touchStart: function() {
			var parent = this;
			return function(evt) {
				var targetStamp = evt.target;

				if(selectedStamp) {
					sandBox.removeClass(selectedStamp, "selected");
					sandBox.addClass(selectedStamp, "unselected");
				}

				selectedStamp = targetStamp;

				sandBox.removeClass(selectedStamp, "unselected");
				sandBox.addClass(selectedStamp, "selected");

				sandBox.notify({
					"type": "stampChange",
					"data": targetStamp.getAttribute("stamp")
				});
			};
		},
		clearStamp: function() {
			// console.log("clear stamp");

			if(selectedStamp) {
				sandBox.removeClass(selectedStamp, "selected");
				sandBox.addClass(selectedStamp, "unselected");
			}

			sandBox.notify({
				"type": "stampChange",
				"data": null
			});
		},

		destroy: function() {
			sandBox.hide(container);
			for(var i = 0; i < stampDivList.length; i++) {
				container.removeChild(stampDivList[i]);
			}
		}
	};
});

Core.registerModule("brushSize", function(sandBox) {
	var brushSizes = [
            { name: "l", value: 20 },
            { name: "m", value: 10 },
            { name: "s", value: 5 }
        ];
    var container = null;
    var brushSizeDivList = [];
	return {

		init: function() {
			container = sandBox.container;
			sandBox.show(container);
			sandBox.addClass(container, "brushSize");

			for(var i = 0; i < brushSizes.length; i++) {
				var brush = brushSizes[i];
				var brushDiv = sandBox.createElement("div");
				brushDiv.setAttribute("brushsize", brush.value);
				brushDiv.setAttribute("brushname", brush.name);
				sandBox.addClass(brushDiv, "brush");
				sandBox.css(brushDiv, "left", (60+i*45));

				container.appendChild(brushDiv);
				brushSizeDivList.push(brushDiv);
				brushDiv.onclick = this.onclick();
				if(sandBox.touchable()) {
	            	brushDiv.addEventListener("touchstart", this.touchStart());
	        	}
			}

			sandBox.css(container, "background-image", "url(images/brush-l.png)");

			sandBox.notify( {
				"type": "brushSizeChange",
				"data": brushSizes[0].value
			} );
		},

		onclick: function() {
			var parent = this;
			return function(evt) {
				var target = evt.target;
				var brushName = target.getAttribute("brushname");
				console.log("brushName " + brushName);
				sandBox.css(sandBox.container, "background-image", "url(images/brush-" + brushName + ".png)");

				sandBox.notify({
					"type": "brushSizeChange",
					"data": target.getAttribute("brushsize")
				});
			}
		},

		touchStart: function() {
			var parent = this;
			return function(evt) {
				var target = evt.target;
				var brushName = target.getAttribute("brushname");
				console.log("brushName " + brushName);
				sandBox.css(sandBox.container, "background-image", "url(images/brush-" + brushName + ".png)");

				sandBox.notify({
					"type": "brushSizeChange",
					"data": target.getAttribute("brushsize")
				});
			};
		},

		destroy: function() {
			sandBox.hide(container);
			for(var i = 0; i < brushSizeDivList.length; i++) {
				container.removeChild(brushSizeDivList[i]);
			}
		}
	};
});

Core.registerModule("chalk", function(sandBox) {
	var container = null;
	var chalkList = ["dfdfdf", "96d0d1", "a4efbc", "f1e08f", "f87cd6", "ff7863"];
	var divChalkList = [], selectedChalk = null;
	return {
		init: function() {
			container = sandBox.container;
			sandBox.show(container);

			for (var i = 0; i < chalkList.length; i++) {
	            var color = chalkList[i];

	            var divPen = sandBox.createElement("div");
	            divPen.setAttribute("chalkcolor", color);
	            sandBox.addClass(divPen, "chalkPen");
	            sandBox.addClass(divPen, "unselected");
	            sandBox.css(divPen, "top", (150+i*80));
	            sandBox.css(divPen, "background-image", "url(images/blackboard/" + i + "_" + color + ".png)");
	            container.appendChild(divPen);
	            divChalkList.push(divPen);
	            divPen.onclick = this.onSelected;
	            if(sandBox.touchable()) {
	            	divPen.addEventListener("touchstart", this.onSelected);
	        	}
	        }

	        selectedChalk = divChalkList[0];
	        sandBox.removeClass(selectedChalk, "unselected");
	        sandBox.addClass(selectedChalk, "selected");
	        sandBox.notify({
	        	"type": "chalkChange",
	        	"data": selectedChalk.getAttribute("chalkcolor")
	        });
		},

		onSelected: function(evt) {
			var chalkPenDiv = evt.target;
			if(selectedChalk) {
				sandBox.removeClass(selectedChalk, "selected");
				sandBox.addClass(selectedChalk, "unselected");
			}
			selectedChalk = chalkPenDiv;
			sandBox.removeClass(selectedChalk, "unselected");
			sandBox.addClass(selectedChalk, "selected");
			sandBox.notify({
				"type": "chalkChange",
				"data": chalkPenDiv.getAttribute("chalkcolor")
			});
		},

		destroy: function() {
			sandBox.hide(container);
			for(var i = 0; i < divChalkList.length; i++) {
				container.removeChild(divChalkList[i]);
			}
		}
	};
});

Core.registerModule("crayon", function(sandBox) {
	
	var container = null;

	var colorList = [
        "ffcd9a",
        "fc0400",
        "ff852e",
        "fec900",
        "d1f800",
        "47d329",
        "29d4a3",
        "29b0d2",
        "2859cf",
        "986ad7",
        "c7bbbb",
        "000000",
        "ffffff"
    ];

    var divPenList = [], selectedDivPen = null;

	return {
		init: function() {
			container = sandBox.container;
			sandBox.show(container);

			for (var i = 0; i < colorList.length; i++) {
	            var color = colorList[i];

	            var divPen = sandBox.createElement("div");
	            divPen.setAttribute("color", color);
	            sandBox.addClass(divPen, "crayonPen");
	            sandBox.addClass(divPen, "unselected");
	            sandBox.css(divPen, "top", (4+i*53));
	            sandBox.css(divPen, "background-image", "url(images/crayon-pens/" + i + "_" + color + ".png)");
	            container.appendChild(divPen);
	            divPenList.push(divPen);
	            divPen.onclick = this.onSelected;
	            if(sandBox.touchable()) {
	            	divPen.addEventListener("touchstart", this.onSelected);
	        	}
	        }
	        selectedDivPen = divPenList[0];

	        sandBox.listen( { "stampChange": this.clearColor } );
	        sandBox.removeClass(selectedDivPen, "unselected");
	        sandBox.addClass(selectedDivPen, "selected");
	        sandBox.notify( {
	        	"type": "colorChange",
	        	"data": colorList[0]
	        } );
		},

		onSelected: function(evt) {
			var selectedDiv = evt.target;
			if (selectedDivPen) {
				sandBox.removeClass(selectedDivPen, "selected");
				sandBox.addClass(selectedDivPen, "unselected");
            }
           	selectedDivPen = selectedDiv;
            sandBox.removeClass(selectedDivPen, "unselected");
            sandBox.addClass(selectedDivPen, "selected");
			sandBox.notify({
	          	"type": "colorChange", 
	           	"data": selectedDiv.getAttribute("color")
	        });	
		},

		clearColor: function(stamp) {
			if(stamp != null) {
				sandBox.removeClass(selectedDivPen, "selected");
				sandBox.addClass(selectedDivPen, "unselected");
			}
		},

		destroy: function() {
			sandBox.hide(container);
			for(var i = 0; i < divPenList.length; i++) {
				container.removeChild(divPenList[i]);
			}
		}
	};
});

Core.registerModule("info", function(sandBox) {
	var container = null;
	var helpDiv = null, finishDiv = null, shadowDiv = null;
	var containDiv = null, contentDiv = null;

	var popUp = function(content) {
		container.appendChild(shadowDiv);
		sandBox.addClass(shadowDiv, "shadow");
		sandBox.addClass(containDiv, "rc shadow");
		containDiv.id = "popup";
		container.appendChild(containDiv);
		contentDiv.id = "pop-content";
		sandBox.addClass(contentDiv, "rc");
		setTimeout(function() {
			containDiv.appendChild(contentDiv);
		}, 2000);
	}

	return {
		init: function() {
			container = sandBox.container;
			sandBox.show(container);
			helpDiv = sandBox.find("#help");
			finishDiv = sandBox.find("#finish");
			shadowDiv = sandBox.createElement("div");

			containDiv = sandBox.createElement("div");
			contentDiv = sandBox.createElement("div");

			helpDiv.onclick = function() {
				var state = JSON.parse(localStorage.getItem("state"));
				var level = state.level;
				var levelDiv = sandBox.createElement("p");
				levelDiv.innerText = "You Current Level: " + level;
				contentDiv.appendChild(levelDiv);
				popUp();
			};
			finishDiv.onclick = function() {
				popUp();
				sandBox.notify({"type": "check"});
			};

			shadowDiv.onclick = function() {
				sandBox.removeClass(shadowDiv, "shadow");
				container.removeChild(containDiv);
				containDiv.removeChild(contentDiv);
				var children = contentDiv.childNodes;
				var length = children.length;
				for (var i = 0; i < length; i++) {
					contentDiv.removeChild(children[i]);
				}
			}
		},

		destroy: function() {
			sandBox.hide(container);
		}
	};
});
