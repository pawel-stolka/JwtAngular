$(document).ready(function() {

  // var urlData = ["maria", "ljubljana"]; // "http://localhost:9000/users";
  // loadData(urlData);


  var url = "http://localhost:3000/users";
  var urlData = d3.json(url, function(data) {
    console.log(data.users);
    loadData(data.users)
  })




  function loadData(usersData) {
    d3.select("#chart")
      .append("svg");

    d3
      .select("svg")
      .append("g")
      .attr("id", "dataG")


      .selectAll("g")
      .data(usersData)
      .enter()
      .append("g")
      .attr("class", "gObjs")
      .style({
        width: "1000px",
        height: "600px"
      })

    var objs = d3.selectAll("g.gObjs");

    objs
      .append("circle")
      .attr({
        cx: function(d, i) {
          console.log(i);
          console.log(d.email);
          return (i * 200) + 21
        },
        cy: 21,
        r: 20
      })
      .style({
        fill: "red",
        stroke: "white",
        "stroke-width": "1px"
      });

    objs
      .append("text")
      .attr({
        x: 50,
        y: function(d, i) { return (i * 50) + 50; }
      })
      .style("fill", "red")
      .text(function(d, i) { return i + ". - " + d.email; })
    // .style({
    //   "font-size": "16px",
    //   "text-anchor",
    //   "middle"
    // })
  }
});
