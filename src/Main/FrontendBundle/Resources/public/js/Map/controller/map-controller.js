(function () {
    'use strict';

    angular
        .module('war.map')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope'];

    function MapCtrl($scope) {

        var width = 960,
            height = 500;

        var vertices = d3.range(30).map(function (d) {
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
                .attr("class", function (d, i) {
                    return "q" + (i % 3);
                })
                .attr("d", polygon)
                .attr("id", function (d, i) {
                    return i;
                })
                .on("mousedown", mousedown)
                .on("mouseover", mouseover);

            path.order();
        }

        function polygon(d) {
            return "M" + d.join("L") + "Z";
        }

        $scope.showPopover = false;
        function mousedown(d) {
            //console.log('this', this.id);
            this.style.fill = 'red';
            var point = d3.mouse(this),
                p = {x: point[0], y: point[1]};
            $scope.showPopover = true;
            $(".q0, .q1, .q2, .q3").mousedown(function () {
                $('#popover').css({'top': p.y, 'left': p.x}).fadeIn('fast');
            });
        }

        function mouseover(d) {
            setTimeout(function () {
                //console.log('hover', d);
            }, 500);
        }

    }

})();
