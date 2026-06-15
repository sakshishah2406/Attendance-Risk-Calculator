let present = 0;
let absent = 0;

function updateUI(){

 let total = present + absent;

 let percentage = 0;

 if(total > 0){
   percentage = (present / total) * 100;
 }

 document.getElementById("present").innerText = present;
 document.getElementById("absent").innerText = absent;
 document.getElementById("percentage").innerText =
 percentage.toFixed(2) + "%";
}

function markPresent(){
 present++;
 updateUI();
}

function markAbsent(){
 absent++;
 updateUI();
}

updateUI();
console.log(attendancePercentage(18,2));