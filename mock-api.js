angular.module('MockApiModule',['ngMockE2E'])
 
.run(function ($httpBackend) {
    var products = [{"type" :[
        {
            "name": "Canny",
            "count": 1000
        },
        {
            "name": "Banny",
            "count": 3000
        },
        {
            "name": "Danny",
            "count": 2000
        }
    ],
 
 "sales":[
        {
            "salesdate": "04/02/2015",
            "amount": 300
        },
        {
            "salesdate": "04/03/2015",
            "amount": 400
        },
        
        {
            "salesdate": "04/9/2015",
            "amount": 700
        },
        {
            "salesdate": "04/12/2015",
            "amount": 500
        },
        {
            "salesdate": "04/13/2015",
            "amount": 300
        },
        {
            "salesdate": "04/15/2015",
            "amount": 300
        },
       
        {
            "salesdate": "04/20/2015",
            "amount": 350
        },
        {
            "salesdate": "04/21/2015",
            "amount": 560
        },
       
        {
            "salesdate": "04/26/2015",
            "amount": 300
        },
        {
            "salesdate": "04/28/2015",
            "amount": 390
        }
    ]

}];

$httpBackend.whenGET('http://5637ccdf1a271a1100252149.mockapi.io/products').respond(products);
})