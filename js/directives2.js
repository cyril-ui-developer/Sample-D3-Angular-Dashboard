

 "use strict"
    angular.module("ChartsDirModule", [])
// directive for bar chart

//for line chart
.directive('barChart', function(){
    function link(scope,el,attrs){
        
        var el =el[0];
        
var margin = {top: 40, right: 20, bottom: 50, left: 40},
    width = scope.width,
    height = scope.height,
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom,
        color = d3.scale.category20();



var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);



var svg = d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  var svgGroup = svg.append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
        
//set a watch on he scope
scope.$watch('data', function(data){
    
    if(!data){ return }
    
    //console.log(data.productType)
    
svgGroup.append("text")
        .attr("x", (width / 2))             
        .attr("y", -(margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("Product Type Bar Chart");

 
  x.domain(data[0].type.map(function(d) { return d.name }));
  y.domain([0, d3.max(data[0].type, function(d) { return d.count; })]);

    // x axis
 svgGroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(0)" )
      .attr("dx", "1em");
    
    // yaxis
  svgGroup.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end").text("Count");

  svgGroup.selectAll("bar")
      .data(data[0].type)
    .enter().append("rect")
      .style("fill", function(d){return color(x(d.name));})
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });
    
        var barWidth = x.rangeBand() / data[0].type.length;
console.log(x.rangeBand() )
  /*  svgGroup.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });*/
   // var i =1;
  // for (i=1; i <= data[0].type.length; i++){
           svgGroup.selectAll(".bartext")
            .data(data[0].type)
            .enter().append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("dy", ".95em")
            .attr("x", function(d) { return x(d.name) + x.rangeBand()/2; })
            // .attr("dx", ".75em")
            //.attr("x", function(d,i) { return x(d.name) ; }) 
            //.attr("x", function(d,i) { return i * x.rangeBand()/2 + 25;})
            //.attr("x", function(d,i) { return i *(width / data[0].type.length); }) 
            //.attr("x", function(d,i) { return (i*  barWidth) + 32  ; })
          //.attr("x", function(d,i) {  return  x.rangeBand()/2 ;})
            .attr("y", function(d) { return  y(d.count); })
            .text(function (d,i){return (d.count) })
   // };
      

    }, true);
    
}
    
   return{
               
      link: link,
      restrict:'EA',
      scope:{
                data: '=',
                width: '=',
                height: '='
            }
        }
})

    // directive for bar chart
.directive('lineChart', function(){
    function link(scope,el,attrs){
        
        var el =el[0];

var margin = {top: 40, right: 20, bottom: 50, left: 40},
    width =800 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;



var x = d3.scale.ordinal().rangeRoundBands([0, width]);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

 var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Amount:</strong> <span style='color:red'>" + d.amount + "</span>";
  })
        
var valueline = d3.svg.line()
    .x(function(d) { return x(d.salesdate); })
    .y(function(d) { return y(d.amount); });

var svg = d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
        
svg.call(tip);
        
        //set a watch on he scope
scope.$watch('data', function(data){
    
    if(!data){ return }
    
svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", -(margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")   
        .text("Product Sales");

 console.log(data[0].sales);
     console.log(data[0].type);

  x.domain(data[0].sales.map(function(d) { return (d.salesdate) }));
  y.domain([0, d3.max(data[0].sales, function(d) { return d.amount; })]);

svg.append("path").attr("d",valueline(data[0].sales)).attr('stroke', 'steelblue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');





  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(0)" )
.attr("dx", "2em");

svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end").text("Amount");

  
  var circle = svg.selectAll("dot")
                .data(data[0].sales)
                .enter().append("circle")
                .attr("r", 3.5)
                .attr("cx", function(d) { return x(d.salesdate); })
                .attr("cy", function(d) { return y(d.amount); })
                .attr('fill','steelblue')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
/*
 svg.selectAll(".circletext")
            .data(data[0].sales)
            .enter().append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("dy", "-0.5em")
            .attr("x", function(d) { return x(d.salesdate)  })
            .attr("y", function(d) { return  y(d.amount); })
            .text(function (d,i){return (d.amount) })
   */
    }, true);
    
}
    
   return{
               
      link: link,
      restrict:'EA',
      scope:{
                data: '=',
                width: '=',
                height: '='
            }
        }
});


