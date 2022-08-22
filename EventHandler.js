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
        StringArr = Array.prototype.slice.apply(arguments)[0];
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

}

var EH1 = new EventHandler(events);
console.log("TESTING : ");
console.log(EH1.getEventsBetweenDates("2022/02/01", "2022/02/16"));
console.log("_________________________________________");
console.log(EH1.getByMonth(05));
console.log("_________________________________________");
console.log(EH1.getUniqueDateAndSort());
console.log("_________________________________________");
console.log(EH1.getSummary(events));