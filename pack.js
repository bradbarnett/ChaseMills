/**
 * Created by bbarnett on 7/28/2016.
 */
function pack() {
    var width = 1000;
    var height = 1000;

    var svg = d3.select('.main').append("svg")
        .attr('width', width).attr('height', height);
    var pack = d3.layout.pack().size([width, height]).padding(50).children(function(d){return d.values}).value(function(d) { return d.value; });

    d3.json('sasaki-graph.json', function (error, data) {

        var nestedData = d3.nest()
            .key(function(d) { return d.color; })
            .entries(data.children);

        console.log(JSON.stringify(nestedData));


        var dataRoot = {
            key: "root",
            values: nestedData
        };

        var nodes = pack.nodes(dataRoot);
        console.log(nodes);
        svg.selectAll('circle').data(nodes).enter().append('circle')
            .attr('cx', function (d) {
                return d.x
            })
            .attr('cy', function (d) {
                return d.y
            })
            .attr('r', function (d) {
                return d.r
            })
            .attr('stroke', 'black')
            .attr('stroke-width', '1')
            .attr('fill', function (d) {
                return 'transparent';
            });
    });
}

pack();