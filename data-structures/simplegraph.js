// A simple node/edge graph structure with directional edges and rendering to
// string representation of graph.
// Can handle cycles in graphs when rendering by building a node seen list.

// TODO: a way to detect cycles and only stop rendering in a true cycle?

class Graph {
  constructor(root) {
    this.root = root;
  }

  toString(seen = []) {
    return this.root.toString(seen);
  }
}

// Just for use in this example to show nodes when rendering
let nodeId = 0;

/**
 * A graph node, has a kv bag and a set of edges
 */
class Node {
  constructor(kv, ...edges) {
    this.kv = kv;
    this.edges = edges || [];
    this.id = nodeId++;
  }

  add(edge) {
    this.edges.push(edge);
  }

  toString(seen = []) {
    seen.push(this.id);
    const edges = this.edges ? this.edges.map(e => {
      return `\t| ${e.toString(seen).replace(/(\r\n|\r|\n)/gm, '\n\t')}`;
    }).join('\n') : '~';
    return `\nNode(${this.id}, ${JSON.stringify(this.kv)})\t\n${edges}`;
  }
}

/**
 * Graph edge, directed, to one node. Has kv bag
 */
class Edge {
  constructor(kv, to) {
    this.kv = kv || {};
    this.to = to;
  }

  prop(n) {
    return this.kv[n]
  }

  toString(seen = []) {
    let node = '~';
    if (this.to) {
      if (!seen.includes(this.to.id)) {
        node = this.to.toString(seen).replace(/(\r\n|\r|\n)/gm, '\n\t');
      } else {
        node = `(ref to node ${this.to.id})`;
      }
    }
    return `--${JSON.stringify(this.kv)}-->${node}`;
  }
}

const t1 = new Node({type: 'human'});
const isA2 = new Edge({type: 'isA'}, t1);
const n2 = new Node({name: 'Bob'}, isA2);

const rel1 = new Edge({type: 'friendOf'}, n2);
const isA1 = new Edge({type: 'isA'}, t1);
const n1 = new Node({name: 'Alice'}, rel1, isA1);

// Add cycle into graph
const rel2 = new Edge({type: 'friendOf'}, n1);
n2.add(rel2);
n2.add(rel2); // What about dupes?

const g = new Graph(n1);
console.log(g.toString());