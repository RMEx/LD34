Landscape = function(x, y, points) {
    this.hitbox = new SAT.Polygon(new SAT.Vector(x,y), points.map(function(pt) { return new SAT.Vector(pt[0], pt[1]) }));
}
