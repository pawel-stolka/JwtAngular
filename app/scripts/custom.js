$(document).ready(function() {

  // var urlData = ["maria", "ljubljana"]; // "http://localhost:9000/users";
  // loadData(urlData);

  var url = "http://localhost:3000/users";
  var urlData = d3.json(url, function(data) {
    // console.log(data);
    loadData(data)
  })

  function loadData(usersData) {
    // console.log(usersData);
    var margin = 50,
      w = 700,
      h = 350,
      width = w + margin,
      height = h + margin,
      barWidth = 50,
      padding = 5;

    var svg = d3.select("#chart")
      .append("svg")
      .attr({
        width: width,
        height: height,
      })
      .style({
        width: width,
        height: height,
        border: '1px lightgray solid'
      })

    var arr = usersData.users;
    console.log(arr);
    var maxHeight = d3.max(arr, function(d, i) {
      var ret = d["logCounter"]
      console.log(d);
      return ret;
    });
console.log("maxHeight " + maxHeight);
    var xScale = d3.scale.linear()
      .domain([0, arr.length - 1])
      .range([margin, width - margin]);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin + "," + margin / 2 + ")")
      .attr("width", w);

    var bars = g
      .selectAll("rect")
      .data(arr)
      .enter()
      .append("rect")
      .style({
        fill: "purple",
        stroke: "white",
        "stroke-width": "1px"
      })
      .attr({
        width: 100, //function(d, i) {return xScale(d);},
        height: height,
        x: function(d, i) { return i * 100; },
        y: 100
      });

    /*
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
    // })*/
  }
});
