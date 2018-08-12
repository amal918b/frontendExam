let data;

window.addEventListener("DOMContentLoaded", seeData);

//snippet of code, copied from Adam, stackoverflow
function countInArray(array, what) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}



function seeData() {


    data = FooBar.getData(); //set data to last function in foobar.js
    const myJson = JSON.parse(data); //translate js into json grabbable data
    console.log(myJson)

        // call a function that assigns stuff for notification
    assignStuff(myJson);

    function showTaps(data) {
        let template = document.querySelector('#tapTemplate').content; //pointing to template

        let tapList = document.querySelector('#tapList'); //parent of beer tap
        let tapGraph = document.querySelector('#tapSvg'); //svg viewbox of graphs

        let s = Snap("#tapSvg"); //setting up snap for graph

        tapList.innerHTML = ""; //make parent stop children multiply at setInterval

        tapGraph.innerHTML = ""; //flush graphs at setInterval

        let tapGraphWidth = 500 / myJson.taps.length; //width of each tab bar in the graph

        myJson.taps.forEach((element, i) => { //show per each tap, index for the snap rectangle
            //            console.log(element)
            let clone = template.cloneNode(true); //cloning set up
            clone.querySelector('p.beerName span').textContent = element.beer; //stamp the clone in place

            let currentLevel = element.level / element.capacity * 100 //setting up the math for beer level percentage

            clone.querySelector('p.beerLevel span').textContent = currentLevel; //stamp beer level out

            //graph of the level of beer

            let yTapGraph = element.level / element.capacity * 100; // y axis for each tap bar

            let singleTapGraph = s.rect(i * tapGraphWidth, 100 - yTapGraph, tapGraphWidth - 4, yTapGraph); //snap graph bar as rectangle with dynamic variables

            singleTapGraph.attr({
                fill: '#F18F01' //color of snap graph bar
            });

            //conditional for tap availability
            if (element.inUse == true) {

            } else { //we mark business it with less opacity
                clone.querySelector('.tapAvailab').classList.add('inUse');
                clone.querySelector('.tapInUse').classList.add('hidden');
            }
            tapList.appendChild(clone); //finish up the cloning
        });
    }
    showTaps(); //run function inside the dynamic refreshed seeData function

    function showOrders(data) {

        let orderTemplate = document.querySelector('#orderTemplate').content;
        let orderParent = document.querySelector('#orderSection');

        orderParent.innerHTML = ""; //if id's of orders match, clear, otherwise keep adding man



        myJson.queue.forEach((element, i) => {

            let clone = orderTemplate.cloneNode(true);

            clone.querySelector('h5.orderId span').textContent = element.id;

            //chichy, Show number of beers in order "X"+"Name"
            const orderinfo = {};

            // build orderinfo from e.order.forEach
            element.order.forEach(beer => {
                const count = countInArray(element.order, beer); // how many times does the beer appears in order
                orderinfo[beer] = count;
            });
            // go into orderinfo object and change the text content with a count of exact beer
            for (name in orderinfo) {
                clone.querySelector(".orders").textContent +=
                    "  " + orderinfo[name] + " " + name  + " | " ;
            }
            orderParent.appendChild(clone);
        });
    }

    showOrders();

    function showServing(data) {

        let servingTemplate = document.querySelector('#orderServed').content;
        let servedParent = document.querySelector('#servedId');

        servedParent.innerHTML = ""; //if id's of orders match, clear, otherwise keep adding man

        myJson.bartenders.forEach(element => {

            let clone = servingTemplate.cloneNode(true);

            clone.querySelector('h6.statusDetail').textContent = element.statusDetail.split(/(?=[A-Z])/).join(" ").toLowerCase(0);
            clone.querySelector('h6.bartenderName').textContent = element.name;

            if (element.servingCustomer === null) {
                clone.querySelector('article.orderBeingServed').classList.add('beingServed')
            } else {
                clone.querySelector('h5.whoIsServed span').textContent = element.servingCustomer;
            }
            servedParent.appendChild(clone);
        });
    }
    showServing();

}

seeData();
setInterval(seeData, 3000);


// create assignStuff(e) to assign elements from the json to the html
function assignStuff(e) {
    document.querySelector(`#orderNotification span`).textContent = e.queue.length;
}

//data that doesnt need to change at setInterval

function showMenu() {

    data = FooBar.getData(); //set data to last function in foobar.js
    const myJson = JSON.parse(data); //translate js into json grabbable data

    let menuTemplate = document.querySelector('#menuTemplate').content;
    let menuParent = document.querySelector('#menuSection');

    myJson.beertypes.forEach(element => {

        let clone = menuTemplate.cloneNode(true);

        clone.querySelector('h6.beerName span').textContent = element.name;

        clone.querySelector('h6.beerType span').textContent = element.category;

        clone.querySelector('h6.beerAlcohol span').textContent = element.alc;

        clone.querySelector('p.aromaBeer span').textContent = element.description.aroma;

        clone.querySelector('p.flavorBeer span').textContent = element.description.flavor;

        clone.querySelector('p.mouthfeelBeer span').textContent = element.description.flavor;

        menuParent.appendChild(clone);
    });
}

showMenu();



//<!--    tabs switching script w3school-->

function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;

}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//collapsibles w3school

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
