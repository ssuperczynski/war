(function () {
    'use strict';

    angular
        .module('war.map')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'MapFactory', 'USER'];

    function MapCtrl($scope, MapFactory, USER) {

        var width = 999,
            height = 999,
            vertices = [];

        var voronoi = d3.geom.voronoi()
            .clipExtent([[0, 0], [width, height]]);

        var svg = d3.select("maps").append("svg")
            .attr("width", width)
            .attr("height", height);

        var path = svg.append("g").selectAll("path");

        $scope.showPopover = false;
        $scope.user = '';

        function init() {
            MapFactory.getUsers().then(function (response) {
                vertices = response.data.coordinates.map(function (d) {
                    return [d.coordinateX, d.coordinateY];
                });
                redraw();
            });
        }

        init();

        function polygon(d) {
            return "M" + d.join("L") + "Z";
        }

        function showMyArea() {
            $('#' + USER).css("fill", "yellow");
        }

        function mousedown(d) {
            var self = this,
                userId = parseInt(self.id, 10) + 1,
                point = d3.mouse(self),
                p = {x: point[0], y: point[1]};

            if (USER === self.id) {
                return;
            }
            //MapFactory.getData(userId).then(function (response) {
            self.style.fill = 'red';
                //$scope.$apply(function () {
            $scope.user = userId;
            $scope.showPopover = true;
                //});

            $(".q0, .q1, .q2, .q3").on('mouseup', function () {
                $('#popover').css({'top': p.y, 'left': p.x}).fadeIn('fast');
            });
            //});
        }

        function mouseover(d) {
            //
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
            showMyArea();
        }

        $scope.queues = [];

        $scope.spy = function (id) {
            MapFactory.sendSpy(id).then(function () {
                $scope.queues.push({id: id});
            });
        };

    }

}());
