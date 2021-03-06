﻿(function () {
    "use strict";

    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var theme;
    var that;
    var synth = new Windows.Media.SpeechSynthesis.SpeechSynthesizer();
    var audio = new Audio();

    ui.Pages.define("/pages/splitdata/splitdata.html", {

        _group: null,
        /// <field type="WinJS.Binding.List" />
        _items: null,
        _itemSelectionIndex: -1,
        _wasSingleColumn: false,

        // This function is called to initialize the page.
        init: function (element, options) {
            // Store information about the group and selection that this page will
            // display.
            this._group = Data.resolveGroupReference(options.data);
            this._items = Data.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;
            this.itemDataSource = this._items.dataSource;
            this.selectionChanged = ui.eventHandler(this._selectionChanged.bind(this));
        },

        // This function is called whenever a user navigates to this page.
        ready: function (element, options) {
            that = this;
            theme = options.theme;
            WinJS.Utilities.addClass(document.getElementsByTagName("body")[0], theme);
            element.querySelector(".pagehometitle").innerText = options.title;
            
            var listView = element.querySelector(".itemlist").winControl;
            if (options.template) {
                listView.itemTemplate = element.querySelector("." + options.template);
                WinJS.Utilities.addClass(element.querySelector(".articlesection"), options.template);
            } else {
                listView.itemTemplate = element.querySelector(".itemtemplate");
            }

            this._updateVisibility(element);
            if (this._isSingleColumn()) {
                this._wasSingleColumn = true;
                if (this._itemSelectionIndex >= 0) {
                    // For single-column detail view, load the article.
                    binding.processAll(element.querySelector(".articlesection"), this._items.getAt(this._itemSelectionIndex));
                }
            } else {
                // If this page has a selectionIndex, make that selection
                // appear in the ListView.
                listView.selection.set(Math.max(this._itemSelectionIndex, 0));
            }
        },

        unload: function () {
            WinJS.Utilities.removeClass(document.getElementsByTagName("body")[0], theme);
            audio.pause();
            this._items.dispose();
        },

        updateLayout: function (element) {
            var isSingleColumn = this._isSingleColumn();
            if (this._wasSingleColumn === isSingleColumn) {
                return;
            }

            var listView = element.querySelector(".itemlist").winControl;
            var firstVisible = listView.indexOfFirstVisible;
            this._updateVisibility(element);

            var handler = function (e) {
                listView.removeEventListener("contentanimating", handler, false);
                e.preventDefault();
            }

            if (isSingleColumn) {
                listView.selection.clear();
                if (this._itemSelectionIndex >= 0) {
                    // If the app has snapped into a single-column detail view,
                    // add the single-column list view to the backstack.
                    nav.history.current.state = {
                        data: this._group.key,
                        selectedIndex: this._itemSelectionIndex
                    };
                    nav.history.backStack.push({
                        location: "/pages/splitdata/splitdata.html",
                        state: { data: this._group.key }
                    });
                    element.querySelector(".articlesection").focus();
                } else {
                    listView.addEventListener("contentanimating", handler, false);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                    listView.forceLayout();
                }
            } else {
                // If the app has unsnapped into the two-column view, remove any
                // consejos instances that got added to the backstack.
                if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/splitdata/splitdata.html") {
                    nav.history.backStack.pop();
                }

                listView.addEventListener("contentanimating", handler, false);
                if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                    listView.indexOfFirstVisible = firstVisible;
                }
                listView.forceLayout();
                listView.selection.set(this._itemSelectionIndex >= 0 ? this._itemSelectionIndex : Math.max(firstVisible, 0));
            }

            this._wasSingleColumn = isSingleColumn;
        },

        // This function checks if the list and details columns should be displayed
        // on separate pages instead of side-by-side.
        _isSingleColumn: function () {
            return document.documentElement.offsetWidth <= 767;
        },

        _selectionChanged: function (args) {
            var listView = args.currentTarget.winControl;
            var details;
            // By default, the selection is restriced to a single item.
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;
                    if (this._isSingleColumn()) {
                        // If snapped or portrait, navigate to a new page containing the
                        // selected item's details.
                        setImmediate(function () {
                            nav.navigate("/pages/splitdata/splitdata.html", { data: this._group.key, selectedIndex: this._itemSelectionIndex });
                        }.bind(this));
                    } else {
                        // If fullscreen or filled, update the details column with new data.
                        details = document.querySelector(".articlesection");
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;
                    }
                }
                that.speech();
            }.bind(this));
        },

        // This function toggles visibility of the two columns based on the current
        // view state and item selection.
        _updateVisibility: function (element) {
            var consejos = element.querySelector(".splitdata");
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    utils.addClass(consejos, "itemdetail");
                    element.querySelector(".articlesection").focus();
                } else {
                    utils.addClass(consejos, "groupdetail");
                    element.querySelector(".itemlist").focus();
                }
            } else {
                utils.removeClass(consejos, "groupdetail");
                utils.removeClass(consejos, "itemdetail");
                element.querySelector(".itemlist").focus();
            }
        },
        // This function toggles visibility of the two columns based on the current
        // view state and item selection.
        speech: function (element) {
            var allVoices = Windows.Media.SpeechSynthesis.SpeechSynthesizer.allVoices;
            var selectedVoice;
            allVoices.forEach(function(e) {
                if (e.language == "es-ES" || e.language == "es-MX" || e.language == "es-AR") {
                    selectedVoice = e;
                }
            });
            if (selectedVoice) {
                synth.voice = selectedVoice;
                var txtData = document.getElementById("data");
                synth.synthesizeTextToStreamAsync(txtData.textContent).then(function (markersStream) {
                    audio.pause();
                    var blob = MSApp.createBlobFromRandomAccessStream(markersStream.ContentType, markersStream);
                    audio.src = URL.createObjectURL(blob, { oneTimeOnly: true });
                    markersStream.seek(0); //start at beginning when speak is hit
                    audio.AutoPlay = Boolean(true);
                    audio.play();
                },
                function OnError(error) {
                    //statusDiv.innerText = "Failed";
                    //statusDiv.style.color = "red";
                });
            }
        }
    });
})();