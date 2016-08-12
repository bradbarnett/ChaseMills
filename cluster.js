$('#highlight-dropdown').change(function () {
    d3.select('svg').remove();
    var val = $('#highlight-dropdown').val();
    // console.log(val);
    clusterLayout(val);
});


var m = {t: 50, l: 10, b: 10, r: 10},
    w = 500,
    h = 500,
    width = w - m.l - m.r,
    height = h - m.t - m.b,
    radius = d3.scale.sqrt().range([0, 24]),
    padding = 25, // separation between same-color nodes
    clusterPadding = 5, // separation between different-color nodes
    maxRadius = 12;


function clusterLayout(id) {

    var svg = d3.select('.main').append("svg")
        .attr('width', w).attr('height', h);

    var categoryNames = svg.append("g")
        .attr("class", "category-names")
        .attr("width", w)
        .attr("height", 50)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "pink");

    var discipline,
        studio,
        title,
        _id = id,
        _filterId,
        clusterObj = [];
// number of distinct clusters


    // console.log(_id);
    // console.log(_filterId);

    function organize(a) {
        a.forEach(function (d, i) {
            newNode = {
                id: d,
                radius: 5,
                x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
                y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
            };
            clusterObj.push(newNode);

        });
    }

    function addThinkTankMembers(d) {
        var strategies = ["Gretchen Keillor", "Patrick Murray", "Ken Goulding", "Thiyagarajan Adi Raman", "Yueying Cui", "Chris Horne", "Theresa O'Neil", "Brad Barnett", "Selin Arslan", "Phillip Bruso"];
        var sustainability = ["Colin Booth", "Bomin Kim"];
        var technology = ["Chanwoo Kim", "Ethan Shrier"];

        if (strategies.indexOf(d.name) != -1) {
            d.strategies = 1;
        }

        if (sustainability.indexOf(d.name) != -1) {
            d.sustainability = 1;
        }
    }

    // function createButton(d) {
    //
    // }

    // console.log(clusterObj);


    d3.json('sasaki-employees.json', function (error, data) {

        var nodes = data.children;


        studio = [];
        discipline = [];
        title = [];
        for (var i = 0; i < nodes.length; i++) {
            item = nodes[i];
            if (studio.indexOf(item.studio) < 0) {
                studio.push(item.studio);
            }
            if (discipline.indexOf(item.discipline) < 0) {
                discipline.push(item.discipline);
            }
            if (title.indexOf(item.title) < 0) {
                title.push(item.title);
            }
        }
        // console.log(studio);
        // console.log(discipline);
        console.log(title);


        var filterId = eval(_id);

        _filterId = filterId;
        m = _filterId.length;

        organize(_filterId);

        var categoryNames = svg.selectAll("g").data(filterId).enter().append("g");
        var offsetWidth = 0;
        var secondRowWidth = 0;

        // categoryNames.each(addButton).attr("fill", "black");

        //
        // function addButton(d, i) {
        //     var current = d3.select(this);
        //     current.attr("class", "svg-button")
        //
        //     current.append("rect")
        //         .attr("x", 0)
        //         .attr("y", 8)
        //         .attr("rx", 2)
        //         .attr("ry", 2)
        //         .attr("fill", "whitesmoke")
        //         .attr("stroke", "black");
        //
        //     current.append("text")
        //         .text(function (d) {
        //             return d;
        //         })
        //         .attr("x", 5)
        //         .attr("y", 25);
        //
        //
        //     var text = current.select('text');
        //     var textWidth = text[0][0].getBBox().width;
        //
        //     current.select("rect").attr("width", (textWidth + 10))
        //         .attr("height", 28);
        //
        //     if (offsetWidth > (width - 50)) {
        //         current.attr("transform", "translate(" + (secondRowWidth) + "," + 40 + ")");
        //         secondRowWidth += (textWidth + 15);
        //     }
        //     else {
        //         current.attr("transform", "translate(" + (offsetWidth) + ",0)");
        //         offsetWidth += (textWidth + 15);
        //     }
        // }

        $('.svg-button').on('mouseenter', function () {
            var current = d3.select(this);
            var val = current.select('text');
            // console.log(val[0][0].innerHTML);
            // (d[_id]);
        })

        nodes.forEach(function (d, i) {
            d.x = Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
                d.y = Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
                d.radius = 5;
            addThinkTankMembers(d);
        })
        //
        // var clusterNodes = svg.selectAll(".clusters").data(clusterObj);
        // console.log(clusterNodes);
        // clusterNodes.enter().append("circle")
        //     .attr("class","clusters")
        //     .attr("r",15)
        //     .attr("cx", function(d) {
        //     return d.x;})
        //     .attr("cy", function(d) {
        //         return d.y;})
        //     .attr("fill","pink");

        var force = d3.layout.force()
            .nodes(nodes)
            .size([width, height])
            .gravity(.025)
            .charge(0)
            .on("tick", tick)
            .start();

        var node = svg.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .style("fill", function (d) {
                if (d.strategies > 0.5) {
                    return "#217ff3";
                }
                else if (d.strategies > 0) {
                    return "#00bcd4";
                }
                else if (d.sustainability > 0) {
                    return "#4caf50";
                }
                else {
                    return "rgb(200,200,200)"
                }
            })
            .attr("name", function (d) {
                return d.name + ", " + d.title + ", " + d.discipline + ", " + d.studio
            })
            .call(force.drag);

        node.transition()
            .duration(750)
            .delay(function (d, i) {
                return i * 5;
            })
            .attrTween("r", function (d) {
                var i = d3.interpolate(0, d.radius);
                return function (t) {
                    return d.radius = i(t);
                };
            });

        var tooltip = d3.select("body")
            .data(nodes)
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            ;

        node.on("mouseover", function (d) {

            return tooltip.text(function () {
                return d.name + ", " + d.title + ", " + d.discipline + ", " + d.studio
            }).style("visibility", "visible");
        })

        node.on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });


        function tick(e) {
            node
                .each(cluster(10 * e.alpha * e.alpha))
                .each(collide(.5))
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        // Move d to be adjacent to the cluster node.
        function cluster(alpha) {
            return function (d) {
                // console.log(d.color);
                var cluster = clusterObj.filter(function (obj) {
                    var filterId = _filterId;
                    return obj.id == d[_id];
                });
                cluster = cluster[0];

                if (cluster === d) return;
                var x = d.x - cluster.x,
                    y = d.y - cluster.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + cluster.radius;
                if (l != r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    cluster.x += x;
                    cluster.y += y;
                }
            };


        }

        function collide(alpha) {
            var quadtree = d3.geom.quadtree(nodes);
            var filterId = _filterId;
            return function (d) {
                var r = d.radius + radius.domain()[1] + padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function (quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y),
                            r = d.radius + quad.point.radius + (d[_id] !== quad.point[_id]) * padding;
                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2
                        || x2 < nx1
                        || y1 > ny2
                        || y2 < ny1;
                });
            };
        }

    })
}


clusterLayout("discipline");
