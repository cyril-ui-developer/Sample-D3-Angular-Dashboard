


    angular.module("ChartsDirModule", [])
// directive for bar chart

        .directive('barChart', function($document,$window){
        
         return{
              restrict:'EA',
              scope:{
                        data: '='
                    },
             
         link: function link(scope,el,attrs){
                  var el =el[0];
             
                 
               var chart = d3.select(el)
                          .append('svg')
                          .style('width', '100%').style('height', '100%');;

     
            
                   drawBarChart = function(data) {
                      chart.selectAll('*').remove();
                //var width = svg.style('width')
                 
           
                var margin = {top: 30, right: 50, bottom: 50, left: 100},
                   //  width = chart.style('width'),
                    width = chart.style('width'),
                     height = chart.style('height'),
                     height = parseInt(height),
                     width = parseInt(width);
                    
                    height = height - margin.top - margin.bottom,
                    width = width - margin.left - margin.right,
                    color = d3.scale.category20();
                console.log('rr34', width)
                
                console.log('jop', height)
                      
                //var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
                var x = d3.scale.ordinal().rangeRoundBands([0, width], .05); //.range([0, chartWidth]);
                var y = d3.scale.linear().range([height, 0]);
                      
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(10);
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(5);

                var svgGroup = chart.append("g")
                              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                //set a watch on he scope
                scope.$watch('data', function(data){

                    if(!data){ return }

           /*    svgGroup.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", -(margin.top/2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px")   
                        .text("Product Type Bar Chart");
*/
console.log(data);
                  x.domain(data[0].type.map(function(d) { return d.name }));
                  y.domain([0, d3.max(data[0].type, function(d) { return d.count; })]);

                    // x axis
                 svgGroup.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)
                      .append("text")
                      .style("text-anchor", "end")
                      .attr("transform", "rotate(0)" )
                      //.attr("dx", "em")
                     .attr("dx", "28em").attr("dy", "3em").text("Product Types");;

                    // yaxis
                  svgGroup.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", "-5.1em")
                      .style("text-anchor", "middle").text("Count");

                  svgGroup.selectAll("bar")
                      .data(data[0].type)
                    .enter().append("rect")
                      .style("fill", function(d){return color(x(d.name));})
                      .attr("x", function(d) { return x(d.name); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { return y(d.count); })
                      .attr("height", function(d) { return height - y(d.count); });

                        //var barWidth = x.rangeBand() / data[0].type.length;
               
                 
                           svgGroup.selectAll(".bartext")
                            .data(data[0].type)
                            .enter().append("text")
                            .attr("class", "bartext")
                            .attr("text-anchor", "middle")
                            .attr("fill", "white")
                            .attr("dy", ".95em")
                            .attr("x", function(d) { return x(d.name) + x.rangeBand()/2; })
                            .attr("y", function(d) { return  y(d.count); })
                            .text(function (d,i){return (d.count) });
     
                }) // end of watch
                  } // end of drawgraph
       // }   //           
                     drawBarChart()
                

        }, //end of link
           
                             template: '<div id="chart"> Product Type Bar Chart</div>',
                            controller:function( $scope){
                                    $window.onresize = function() {
                                        $scope.$apply(drawBarChart());
                        };
                            }
                 }
    })
    
    
        // directive for line chart
.directive('lineChart', function($document,$window){
        
         return{
              restrict:'EA',
              scope:{
                        data: '='
                    },
             
         link: function link(scope,el,attrs){
                  var el =el[0];
             
             /*
                    var svg = d3.select(el).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
*/    
            
               var svg = d3.select(el)
                          .append('svg').style('background','white')
                          .style('width', '100%').style('height', '100%');
                        

     
            
                   drawLineChart = function() {
                    svg.selectAll('*').remove();
                //var width = svg.style('width')
                 
             var margin = {top: 30, right: 50, bottom: 40, left: 100},
                   //  width = chart.style('width'),
                    width = svg.style('width'),
                     height = svg.style('height'),
                     height = parseInt(height),
                     width = parseInt(width);
                    
                    height = height - margin.top - margin.bottom,
                   width = width - margin.left - margin.right;
                        
                    var x = d3.scale.ordinal().rangeRoundBands([0, width]);

                    var y = d3.scale.linear().range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                        .ticks(5)
                     .ticks(d3.time.days, 1)
    .tickFormat(d3.time.format('%d/%m/%y'));

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(5)
                    ;
                // var parseDate = new Date(); 
                    var tip = d3.tip()
                          .attr('class', 'd3-tip')
                          .offset([-10, 0])
                          .html(function(d) {
                            return "<strong>Amount:</strong> <span style='color:white'>" + d.amount + "</span>";
                          })
                 
                    var valueline = d3.svg.line()
                        .x(function(d) { return x(new Date(d.salesdate)) + x.rangeBand()/2;; })
                        .y(function(d) { return y(d.amount); })
                          ;
                        //.attr("x", function(d) { return x(d.category) + x.rangeBand()/2; })
                            //set a watch on he scope
                    scope.$watch('data', function(data){
                   // chart.selectAll('*').remove();
                        if(!data){ return }
                        
    var svgGroup = svg.append("g")
                              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                   /*     
                   svgGroup.append("text")
                            .attr("x", (width / 2))             
                            .attr("y", -(margin.top/2))
                            .attr("text-anchor", "middle")  
                            .style("font-size", "16px")   
                            .text("Product Sales");
*/
                 // var dateFormat = d3.time.format("%M/%d/%y");

                      x.domain(data[0].sales.map(function(d) { return new Date(d.salesdate) }));
                      y.domain([0, d3.max(data[0].sales, function(d) { return d.amount; })]);
                    
                        // draw the path
                    svgGroup.append("path").attr("d",valueline(data[0].sales)).attr('stroke', 'steelblue')
                      .attr('stroke-width', 2)
                      .attr('fill', 'none')
                     //.attr("x", function(d) { return x(d.category) + x.rangeBand()/2; })
                    ;
                   
                     // x axis   
                    svgGroup.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + height + ")")
                          .call(xAxis)
                     //.ticks(d3.time.days, 1)
   // .tickFormat(d3.time.format('%d/%m /%y'))
                        //.selectAll("text")
                         .append("text")
                          .style("text-anchor", "end")
                          .attr("transform", "rotate(0)" )
                         .attr("dx", "28em").attr("dy", "3em").text("Sales Date");
                    
                        // y axis
                    svgGroup.append("g")
                          .attr("class", "y axis")
                          .call(yAxis)
                    
                        .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 6)
                          .attr("dy", "-5.1em")
                          .style("text-anchor", "middle").text("Amount");
                        
                         


                      svgGroup.call(tip);
                        
                      var circle = svgGroup.selectAll("dot")
                                    .data(data[0].sales)
                                    .enter().append("circle")
                                    .attr("r", 3.5)
                                    //.attr("cx", function(d) { return x(d.category); })
                                    .attr("cx", function(d) { return x(new Date(d.salesdate)) + x.rangeBand()/2; })
                                    .attr("cy", function(d) { return y(d.amount); })
                                    .attr('fill','steelblue')
                                    .on('mouseover', tip.show)
                                   .on('mouseout', tip.hide)

                    /* svgGroup.selectAll(".linetext")
                                .data(data[0].sales)
                                .enter().append("text")
                                .attr("class", "bartext")
                                .attr("text-anchor", "middle")
                                .attr("fill", "black")
                                .attr("dy", "-0.5em")
                                //.attr("x", function(d) { return x(d.category)  })
                                .attr("x", function(d) { return x(d.salesdate) + x.rangeBand()/2; })
                                .attr("y", function(d) { return  y(d.amount); })
                                .text(function (d,i){return (d.amount) })
                        */
             }) // end of watch
                          } // end of drawgraph
               // }   //           
                             drawLineChart()
                           /*$window.onresize = function() {
                                  scope.$apply(drawGraph3());
                                }*/

                }, //end of link

                 template: '<div id="chart"> Product Sales Line Chart</div>',
              controller: function($scope){
                                    angular.element($window).on('resize', function(){ $scope.$apply(drawLineChart()) });
                                    }
                 }
            
            })
