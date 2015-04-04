(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope'];

    function MapCtrl($scope) {

        var width = 960,
            height = 500;

        var vertices = d3.range(300).map(function(d) {
            return [Math.random() * width, Math.random() * height];
        });

        var voronoi = d3.geom.voronoi()
            .clipExtent([[0, 0], [width, height]]);

        var svg = d3.select("maps").append("svg")
            .attr("width", width)
            .attr("height", height);

        var path = svg.append("g").selectAll("path");
        redraw();

        function redraw() {
            path = path
                .data(voronoi(vertices), polygon);

            path.exit().remove();

            path.enter().append("path")
                .attr("class", function(d, i) { return "q" + (i % 3); })
                .attr("d", polygon)
                .on("mousedown", mousedown)
                .on("mouseover", mouseover);

            path.order();
        }

        function polygon(d) {
            return "M" + d.join("L") + "Z";
        }

        function mousedown(d) {
            console.log('this', this);
            this.style.fill = 'red';
            console.log('down', d);
        }

        function mouseover(d) {
            setTimeout(function(){
                //console.log('hover', d);
            }, 500);
        }


    }

})();
