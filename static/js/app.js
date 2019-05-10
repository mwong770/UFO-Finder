(function () {

    //from data.js
    const tableData = data;

    let filterDict = {}

    function populateTable(dataArr) {
        const tbody = d3.select('tbody');
        tbody.html('');
        dataArr.forEach(function (sighting) {
            const row = tbody.append('tr');
            Object.values(sighting).forEach(function (value) {
                row.append('td').text(value)
            });
        });
    }

    function updateFilterDict(filter) {
        let id = filter.property('id');
        let value = filter.property('value');
        if (value) {
            filterDict[id] = value;
        } else {
            delete filterDict[id]
        }
    }

    function filterData() {
        let filteredData = tableData;
        Object.entries(filterDict).forEach(([key, value]) => {
            filteredData = filteredData.filter(sighting => sighting[key] === value);
        });
        return filteredData;
    }

    d3.selectAll('.form-control').on('input', function () {
        d3.event.preventDefault();
        updateFilterDict(d3.select(this));
        let filteredData = filterData();
        populateTable(filteredData);
    });

    d3.selectAll('.sort').on('click', function () {
        var hasClass = d3.select(this).classed('active-sort');
        // only sort column if not already sorted by column
        if (!hasClass) {
            d3.selectAll('.sort').classed('active-sort', false);
            d3.select(this).classed('active-sort', true);
            var columnId = d3.select(this).property('parentElement').id
            var key = columnId.split('-')[0]
            let sortedData = tableData;
            sortedData.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
            populateTable(sortedData);
        }
    });

    populateTable(tableData);

}());