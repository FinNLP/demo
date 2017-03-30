module.exports = function (treeData,elId){
	treeData = fixTree(treeData)[0];
	// ************** Generate the tree diagram  *****************
	var margin = {top: 20, right: 120, bottom: 20, left: 120};
	var width = 900 - margin.right - margin.left;
	var height = 400 - margin.top - margin.bottom;
	var i = 0;
	var tree = d3.layout.tree().size([height, width]);
	var diagonal = d3.svg.diagonal().projection(d=>[d.x, d.y]);
	var svg = d3
		.select("#"+elId)
		.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	root = treeData;
	// Compute the new tree layout.
	var nodes = tree.nodes(root).reverse()
	var links = tree.links(nodes);
	// Normalize for fixed-depth.
	nodes.forEach(d => d.y = d.depth * 100);
	// Declare the nodes
	var node = svg
		.selectAll("g.node")
		.data(nodes, d => d.id || (d.id = ++i));
	// Enter the nodes.
	var nodeEnter = node
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform",d => "translate(" + d.x + "," + d.y + ")");
	nodeEnter
		.append("circle")
		.attr("r", 10)
		.style("fill", "#fff");
	nodeEnter
		.append("text")
		.attr("y",d => d.children ? 18 : 18)
		.attr("dy", ".35em")
		.attr("text-anchor", "middle")
		.text(function(d){return d.name;})
		.style("fill-opacity", 1);
	// Declare the links
	var link = svg
		.selectAll("path.link")
		.data(links, d => d.target.id);
	// Enter the links.
	link
		.enter()
		.insert("path", "g")
		.attr("class", "link")
		.attr("d", diagonal);
}

function fixTree (tree){
	return tree.map((item)=>{
		return {
			name:item.label + ":" + item.tokens.join(" "),
			children:fixTree(item.left).concat(fixTree(item.right))
		}
	})
}