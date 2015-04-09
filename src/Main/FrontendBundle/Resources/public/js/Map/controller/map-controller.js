(function () {
    'use strict';

    angular
        .module('war.map')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'MapFactory'];

    function MapCtrl($scope, MapFactory) {

        var width = 960,
            height = 600,
            vertices = [],
            voronoi = d3.geom.voronoi()
                .clipExtent([[0, 0], [width, height]]),
            svg = d3.select("maps").append("svg")
                .attr("width", width)
                .attr("height", height),
            path = svg.append("g").selectAll("path");

        $scope.showPopover = false;
        $scope.user = '';

        function init() {
            MapFactory.getUsers().then(function (response) {
                vertices = response.data.coordinates.map(function (d) {
                    return [d.coordinateX * width, d.coordinateY * height];
                });
                redraw();
            });
        }

        init();

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
            var self = this,
                userId = parseInt(self.id, 10) + 1,
                point = d3.mouse(self),
                p = {x: point[0], y: point[1]};
            MapFactory.getData(userId).then(function (response) {
                self.style.fill = 'red';
                //$scope.$apply(function () {
                $scope.user = response.data;
                $scope.showPopover = true;
                //});

                $(".q0, .q1, .q2, .q3").on('click', function () {
                    $('#popover').css({'top': p.y, 'left': p.x}).fadeIn('fast');
                });
            });
        }

        function mouseover(d) {
            setTimeout(function () {
                //console.log('hover', d);
            }, 500);
        }

    }

})();
