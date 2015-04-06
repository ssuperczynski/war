(function () {
    'use strict';

    angular
        .module('war.map')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'MapFactory'];

    function MapCtrl($scope, MapFactory) {
        init();
        var width = 960,
            height = 600;
        var vertices = [];
        $scope.showPopover = false;
        $scope.user = '';
        var voronoi = d3.geom.voronoi()
            .clipExtent([[0, 0], [width, height]]);

        var svg = d3.select("maps").append("svg")
            .attr("width", width)
            .attr("height", height);

        var path = svg.append("g").selectAll("path");

        function init() {
            MapFactory.getUsers().then(function (response) {
                vertices = response.data.coordinates.map(function (d) {
                    return [d.coordinateX * width, d.coordinateY * height];
                });
                redraw();
            });
        }

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


        function mousedown(d) {
            var self = this;
            this.style.fill = 'red';
            var point = d3.mouse(self),
                p = {x: point[0], y: point[1]};
            $scope.$apply(function () {
                $scope.user = self.id;
                $scope.showPopover = true;
            });

            $(".q0, .q1, .q2, .q3").on('click', function () {
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
