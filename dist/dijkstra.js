"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dijkstra = exports.Vertex = exports.NodeVertex = void 0;
class NodeVertex {
}
exports.NodeVertex = NodeVertex;
class Vertex {
    constructor(theName, theNodes, theWeight) {
        this.name = theName;
        this.nodes = theNodes;
        this.weight = theWeight;
    }
}
exports.Vertex = Vertex;
class Dijkstra {
    constructor() {
        this.vertices = {};
    }
    addVertex(vertex) {
        this.vertices[vertex.name] = vertex;
    }
    findPointsOfShortestWay(start, finish, weight) {
        let nextVertex = finish;
        let arrayWithVertex = [];
        while (nextVertex !== start) {
            let minWeigth = Number.MAX_VALUE;
            let minVertex = "";
            for (let i of this.vertices[nextVertex].nodes) {
                // if(this.vertices[i.nameOfVertex] === undefined){
                //     break;
                // }
                if (i.weight + this.vertices[i.nameOfVertex].weight < minWeigth) {
                    minWeigth = this.vertices[i.nameOfVertex].weight;
                    minVertex = i.nameOfVertex;
                }
            }
            arrayWithVertex.push(minVertex);
            nextVertex = minVertex;
        }
        return arrayWithVertex;
    }
    findShortestWay(start, finish) {
        let nodes = {};
        let visitedVertex = [];
        for (let i in this.vertices) {
            if (this.vertices[i].name === start) {
                this.vertices[i].weight = 0;
            }
            else {
                this.vertices[i].weight = Number.MAX_VALUE;
            }
            nodes[this.vertices[i].name] = this.vertices[i].weight;
        }
        while (Object.keys(nodes).length !== 0) {
            let sortedVisitedByWeight = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight);
            let currentVertex = this.vertices[sortedVisitedByWeight[0]];
            for (let j of currentVertex.nodes) {
                const calculateWeight = currentVertex.weight + j.weight;
                // if(this.vertices[j.nameOfVertex] === undefined ){
                //     break;
                // }
                if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
                    this.vertices[j.nameOfVertex].weight = calculateWeight;
                }
            }
            delete nodes[sortedVisitedByWeight[0]];
        }
        const finishWeight = this.vertices[finish].weight;
        let arrayWithVertex = this.findPointsOfShortestWay(start, finish, finishWeight).reverse();
        arrayWithVertex.push(finish, finishWeight.toString());
        return arrayWithVertex;
    }
}
exports.Dijkstra = Dijkstra;
// let dijkstra = new Dijkstra();
// var arrtest: Array<NodeVertex> = [{ nameOfVertex: "B", weight: 3 },{ nameOfVertex: "C", weight: 3 },{ nameOfVertex: "D", weight: 3 }];
// var newVertex = new Vertex("A", [], 1);
// newVertex.nodes = arrtest ;
// console.log( newVertex);
// dijkstra.addVertex(newVertex);
// console.log(dijkstra.findShortestWay("A", "B"));
// let dijkstra = new Dijkstra();
// const additionalPoints: NodeVertex[] = [{ nameOfVertex: "C", weight: 3 }, { nameOfVertex: "E", weight: 7 }, { nameOfVertex: "B", weight: 4 }];
// var newVertex = new Vertex("A", [], 1);
// newVertex.nodes = additionalPoints
// dijkstra.addVertex(newVertex);
// dijkstra.addVertex(new Vertex("B", [{ nameOfVertex: "A", weight: 4 }, { nameOfVertex: "C", weight: 6 }, { nameOfVertex: "D", weight: 5 }], 1));
// dijkstra.addVertex(new Vertex("C", [{ nameOfVertex: "A", weight: 3 }, { nameOfVertex: "B", weight: 6 }, { nameOfVertex: "E", weight: 8 }, { nameOfVertex: "D", weight: 11 }], 1));
// dijkstra.addVertex(new Vertex("D", [{ nameOfVertex: "B", weight: 5 }, { nameOfVertex: "C", weight: 11 }, { nameOfVertex: "E", weight: 2 }, { nameOfVertex: "F", weight: 2 }], 1));
// dijkstra.addVertex(new Vertex("E", [{ nameOfVertex: "A", weight: 7 }, { nameOfVertex: "C", weight: 8 }, { nameOfVertex: "D", weight: 2 }, { nameOfVertex: "G", weight: 5 }], 1));
// dijkstra.addVertex(new Vertex("F", [{ nameOfVertex: "D", weight: 2 }, { nameOfVertex: "G", weight: 3 }, { nameOfVertex: "Z", weight: 3 }], 1));
// // dijkstra.addVertex(new Vertex("G", [{ nameOfVertex: "D", weight: 10 }, { nameOfVertex: "E", weight: 5 }, { nameOfVertex: "F", weight: 3 }], 1));
// console.log(dijkstra.findShortestWay("A", "F"));
//# sourceMappingURL=dijkstra.js.map