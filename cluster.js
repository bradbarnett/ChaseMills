function pack() {

    var width = 960,
        height = 500,
        padding = 1.5, // separation between same-color nodes
        clusterPadding = 6, // separation between different-color nodes
        maxRadius = 12;

    var n = 200, // total number of nodes
        m = 10; // number of distinct clusters
    var clusters = new Array(m);

    var w = 960,
        h = 500,
        fill = d3.scale.category10();

    var vis = d3.select("#chart").append("svg")
        .attr("width", w)
        .attr("height", h);

    var svg = d3.select('.main').append("svg")
        .attr('width', width).attr('height', height);

    var force = d3.layout.force()
        .size([width, height])
        .gravity(.02)
        .charge(0)

        .start();

    var pack = d3.layout.pack().size([width, height]).padding(50).children(function (d) {
        return d.values
    }).value(function (d) {
        return d.value;
    });

    d3.json('sasaki-graph.json', function (error, data) {



        // var nestedData = d3.nest()
        //     .key(function (d) {
        //         return d.color;
        //     })
        //     .entries(data.children);
        //
        // console.log(JSON.stringify(nestedData));
        //
        // var dataRoot = {
        //     key: "root",
        //     values: nestedData
        // };
        var nodes = data.children;
        force.nodes(data.children);
        // console.log(nodes);

        <!DOCTYPE html>
        <html>
        <head>
        <title>Force-Directed Layout with Convex Hull</title>
        <script src="http://mbostock.github.com/d3/d3.js?2.7.4"></script>
            </head>
            <body>
            <div id="chart"></div>
            <script type="text/javascript">



        vis.append("path")
            .style("fill", "#ccf")
            .style("stroke", "#ccf")
            .style("stroke-width", 20);

        var force = d3.layout.force()
            .nodes(nodes)
            .links([])
            .size([w, h])
            .start();

        var node = vis.selectAll("circle.node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", 8)
            .style("fill", function(d, i) { return fill(i & 3); })
            .style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
            .style("stroke-width", 1.5)
            .call(force.drag);

        vis.style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);

        force.on("tick", function(e) {

            // Push different nodes in different directions for clustering.
            var k = 6 * e.alpha;
            nodes.forEach(function(o, i) {
                o.x += i & 2 ? k : -k;
                o.y += i & 1 ? k : -k;
            });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            vis.selectAll("path")
                .data([d3.geom.hull(nodes.map(function(d) { return [ d.x, d.y ]; }))])
                .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
        });

        d3.select("body").on("click", function() {
            nodes.forEach(function(o, i) {
                o.x += (Math.random() - .5) * 40;
                o.y += (Math.random() - .5) * 40;
            });
            force.resume();
        });

        </script>
        </body>
        </html>
    });
}

pack();
