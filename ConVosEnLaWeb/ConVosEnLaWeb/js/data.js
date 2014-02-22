(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: Replace the data with your real data.
    // You can add data from asynchronous sources whenever it becomes available.
    getData().forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        return groupedItems.groups.getItemFromKey(key).data;
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    function getData() {
        var groups = [
            { key: "ninos", title: "Consejos", subtitle: "", backgroundImage: "" },
            { key: "consejos", title: "Consejos", subtitle: "", backgroundImage: "" },
            { key: "glosario", title: "Glosario", subtitle: "", backgroundImage: "" }
        ];

        var items = [
            { group: groups[0], title: "Item Title: 1", subtitle: "Item Subtitle: 1", content: "", backgroundImage: "" },

            { group: groups[1], title: "Item Title: 1", subtitle: "Item Subtitle: 1", content: "", backgroundImage: "" },

            { group: groups[2], title: "Item Title: 1", subtitle: "Item Subtitle: 1", content: "", backgroundImage: "" }
        ];

        return items;
    }
})();
