function EventHandler(objArr){
    this.objArr = objArr;


    this.getEventsBetweenDates = function(start, end){
        return  this.objArr.filter(dateHelp);
    
        function dateHelp(x) {
            return x.dateStart >= start && x.dateEnd <= end;    
        }
    }

    this.getByMonth = function(month){        
        return this.objArr.filter(MonthHelp);
        
        function MonthHelp(x) {
            return x.dateEnd.substring(5,7) == month;
        }     
    }


    this.getUniqueDateAndSort = function(){
        var temp = this.objArr;

        temp.sort(function(x, y){ 
            return x.dateStart.substring(5,7) - y.dateStart.substring(5,7);      
        });
        function SortHelper(x){
            return x.dateStart != x.dateEnd;
        }
        return temp.filter(SortHelper);
    }

    this.getSummary = function(){
        let StringArr;

        if (arguments.length == 0) {
            StringArr = this.objArr;
        } else {
            let janA = Array.prototype.slice.apply(arguments)[0];

            if (janA.constructor === Array) {
                StringArr = janA;  
            } else {
                StringArr = Array.prototype.slice.apply(arguments);
            }
        } 
        var arrReturn = [];

        StringArr.map(function(x) {
            if (x.dateStart == x.dateEnd) {
            arrReturn.push("On " + x.dateStart + ":"
            + x.name + "(" + x.description + ")");          
            } else {
            arrReturn.push("From " + x.dateStart + " to "
            + x.dateEnd + ": "
            + x.name + "(" + x.description + ")");          
            }
        });
        return arrReturn;  
    }

    // Helper prototype 1: 
    Array.prototype.getEventsBetweenDates = function(start, end){
        return new EventHandler(this).getEventsBetweenDates(start, end);
    }

    // Helper prototype 2: 
    Array.prototype.getByMonth = function(month){
        return new EventHandler(this).getByMonth(month);
    }

    // Helper prototype 3: 
    Array.prototype.getUniqueDateAndSort = function(){
        return new EventHandler(this).getUniqueDateAndSort();
    }

    // Helper prototype 4: 
    Array.prototype.getSummary = function(){
        return new EventHandler(this).getSummary(this);
    }


}

var EH1 = new EventHandler(events);
// console.log("TESTING : ");
// console.log(EH1.getEventsBetweenDates("2022/02/01", "2022/02/16"));
// console.log("_________________________________________");
// console.log(EH1.getByMonth(05));
// console.log("_________________________________________");
// console.log(EH1.getUniqueDateAndSort());
// console.log("_________________________________________");
// console.log(EH1.getSummary());
// console.log("_________________________________________");
// console.log(EH1.getByMonth(06).getSummary());