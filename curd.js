let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btnCreate = document.getElementById('btnCreate');
let searchInput = document.getElementById('searchInput'); 

let dataPro ;
let mood = 'create';
let tmp;
let searchMood = 'title';

let delteAllMode = 'All';
let temArr;


let pidGen = function(){
 return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

if(localStorage.prodcut != null){
	dataPro = JSON.parse(localStorage.prodcut);
}
else{
	dataPro = [];
}

function getTotal(){
    if(price.value != ''){
		let res = (+price.value + +taxes.value + +ads.value) 
		- +discount.value;
	    
	    total.innerHTML = res;
	    total.style.backgroundColor = 'green';
}

    else{
    	total.innerHTML = '';
	    total.style.backgroundColor = 'var(--cherry-red-color)';
    }
}


window.onload = function(){
	showData();
}

//create a real object 

btnCreate.onclick = function(){
	let newObj = {
		title: title.value,
		price: price.value,
		ads: ads.value,
		taxes: taxes.value,
		discount: discount.value,
		total: total.innerHTML,
		count: count.value,
		category:category.value
	}

	if(mood === 'create'){

		let pid =pidGen();
        newObj["pid"]= pid;

	   if(newObj.count > 1){
		   	for(let i=0;i<newObj.count ;i++){

		    dataPro.push(newObj);
		   	}
	   }
	   else{
	       dataPro.push(newObj);      	
	   }

	}else{
		dataPro[tmp] = newObj;
		btnCreate.innerHTML = 'Create';
		mood ='create';
	}
    
   
  

    localStorage.prodcut = JSON.stringify(dataPro);
   
    getClear();

    showData();
}


//function to clear the fields after the creation of 
//the product

function getClear(){
	title.value = '';
	price.value = '';
    taxes.value ='';
	ads.value = '';
	discount.value = '';
    total.innerHTML ='';
    total.style.backgroundColor ='var(--cherry-red-color)';
    count.value = '';
    category.value ='';
}

//function to show the data in the table

function showData(){
   let table = '';
   
  if(dataPro.length>0){
  	document.getElementById('deleteAll').innerHTML = 
  	`<button onclick="delteAll()"
  	 id="delteAllbtn">Delete All (${dataPro.length})</button>`;	
  }
  else{
  	document.getElementById('deleteAll').innerHTML = '';	

  }

   for(let i=0; i< dataPro.length ; i++){
     let obj =
      dataPro[i];
     table += 
     	`<tr>
     			<td>${i}</td>
     			<td>${obj.title}</td>
     			<td>${obj.price}</td>
     			<td>${obj.ads}</td>
     			<td>${obj.discount}</td>
     			<td>${obj.total}</td>
     			<td>${obj.category}</td>
     			<td><button onclick="updateItem(${i})" id='updateButton'>update</button></td>
     			<td><button onclick="deleteItem(${i})" id='deleteButton'>delete</button></td>
     		</tr>
`
     ;

   }

   document.getElementById('tbody').innerHTML = table;
   //console.log(table);
}


function deleteItem(i){
 dataPro.splice(i,1);
 localStorage.prodcut = JSON.stringify(dataPro);
 showData();
}


//delte all the items 
function delteAll(){

    if(delteAllMode === 'All'){
    dataPro.splice(0);
	localStorage.clear();
	showData();
    }
    else{

     let pidArr =[];
     for(let i=0 ;i< temArr.length ;i++){
	    pidArr.push(dataPro[temArr[i]].pid);
     }
     
     for(let j=0;j< pidArr.length ; j++)
     for(let i=0; i< dataPro.length ;i++){
      if(dataPro[i].pid == pidArr[j])
        dataPro.splice(i,1);
     }
     // console.log(pidArr);

     // console.log('dataPro',dataPro);

         localStorage.prodcut = JSON.stringify(dataPro);
	    showData();

	    delteAllMode = 'All';
	    temArr =[];

	    searchMood = 'title';
        searchInput.placeholder = 'Search By Title';
        searchInput.value = '';
    }

}

//let the count work
//update the object or item


function updateItem(i){
	let obj = dataPro[i];

	title.value = obj.title;
	price.value = obj.price;
	taxes.value = obj.taxes;
	ads.value = obj.ads;
	discount.value = obj.discount;
	category.value = obj.category;

	getTotal();
	window.scroll({
		top:0,
		behavior:'smooth',
	});

	mood = 'update';
    tmp = i;
    btnCreate.innerHTML = 'Update';

}


//search for an item by title or by category

function changeSearchMood(id){
	if(id === 'search_by_title'){
		searchMood = 'title';
        searchInput.placeholder = 'Search By Title';
	}
	else{
		searchMood = 'category';
        searchInput.placeholder = 'Search By Category';

	}

}


function serchForItems(value){

    let delteAllbtn = document.getElementById('delteAllbtn');

    let table ='';
    let arr = [];
	if(searchMood === 'title'){   
		for(let i=0 ; i< dataPro.length ; i++){
             if(dataPro[i].title.includes(value)){
             	    let obj= dataPro[i];
             	    arr.push(i);
			                table += 
			     	`<tr>
			     			<td>${i}</td>
			     			<td>${obj.title}</td>
			     			<td>${obj.price}</td>
			     			<td>${obj.ads}</td>
			     			<td>${obj.discount}</td>
			     			<td>${obj.total}</td>
			     			<td>${obj.category}</td>
			     			<td><button onclick="updateItem(${i})" id='updateButton'>update</button></td>
			     			<td><button onclick="deleteItem(${i})" id='deleteButton'>delete</button></td>
			     		</tr>
			`
			     ;
             } 
    }
   document.getElementById('tbody').innerHTML = table;

   delteAllMode = 'search';

   temArr =arr;

   delteAllbtn.innerHTML = `Delete All (${arr.length})`;
  
   // console.log(arr);


}
else{
		for(let i=0 ; i< dataPro.length ; i++){
             if(dataPro[i].category.includes(value)){
             	 let obj= dataPro[i];
             	   arr.push(i);
			                table += 
			     	`<tr>
			     			<td>${i}</td>
			     			<td>${obj.title}</td>
			     			<td>${obj.price}</td>
			     			<td>${obj.ads}</td>
			     			<td>${obj.discount}</td>
			     			<td>${obj.total}</td>
			     			<td>${obj.category}</td>
			     			<td><button onclick="updateItem(${i})" id='updateButton'>update</button></td>
			     			<td><button onclick="deleteItem(${i})" id='deleteButton'>delete</button></td>
			     		</tr>
			`
			     ;
             } 
    }
   document.getElementById('tbody').innerHTML = table;

    delteAllMode = 'search';

   temArr =arr;

   delteAllbtn.innerHTML = `Delete All (${arr.length})`;
  
   // console.log(arr);

}
 
}

