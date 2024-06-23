
let i=2;
       setInterval(()=>{
          tbl.innerHTML=`<img class='img' src='img${i}.webp' alt="food">`;
          tbl.innerHTML=tbl.innerHTML+`<img class='img' src='img${i+1}.webp' alt="food">`
          i+=2;
          if(i==10){
            i=0;
          }
       },5000);

let recipies=document.querySelector("#recipes");
let recpie=document.querySelector("#dish");
let search=document.querySelector("#search");

search.addEventListener("click",()=>{
    tbl.style.display="none";
    let inputVal=recpie.value.trim();
    if(inputVal===""){ 
       recipies.innerHTML="<h1>!! Enter a Recipe to Find First!!</h1>";
    }
    else{
        recipies.innerHTML="<h1> Finding Your Recipies.......</h1>";
        setTimeout(()=>{
            fetchRecipe(inputVal);
        },2000);
    }
   
});

async function fetchRecipe(food) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);

        const data = await response.json();

        if (data.meals==null) {
            recipies.innerHTML = "<h2>No recipes found for this dish .</h2>";
        } else {
            recipies.innerHTML = ""; 
            let recipeHtml=""
            data.meals.forEach(recipe => {
               var div=document.createElement("div");
                div.classList.add("main");
                div.innerHTML=`
                <img class='im' src=${recipe.strMealThumb} >
                 <h2>${recipe.strMeal}</h2>
                <h3>Origin : ${recipe.strArea}</h3>
                <h4>Category : ${recipe.strCategory}</h4>
               <br>
                `; 
                let btn=document.createElement("p");
                btn.classList.add("instructions");
                btn.innerHTML="View Recipe";
                div.append(btn);
                    btn.addEventListener("click",()=>{
                     popup(recipe) ;
                });
                recipies.append(div);  
            });
             
    }
    let recipeDiv=document.querySelector("#recipeDetails");
    let details=document.querySelector("#details");
    function popup(recipe){
        details.innerHTML=`
         <h2>${recipe.strMeal}</h2>
         <br>
         <h3>Ingredients:</h3>
         <br>
         <ul style='display: inline-block; text-align: left;'>${fetchIngredients(recipe)}</ul>
         <div>
         <br>
         <h3>Instructions:</h3>
         <br>
         <h5> ${recipe.strInstructions}</h5>
         <br>
         <a id='link' href='${recipe.strYoutube}' target='_blank'> click here for video </a>
         <br>
         <br>
         </div>
        `
    
            recipeDiv.style.display="flex";
    }
 
   function  fetchIngredients(recipe) {
   
        let str="";
        let i=1;
        while(recipe[`strIngredient${i}`] && recipe[`strMeasure${i}`] ){
            str+=`<li>${recipe[`strIngredient${i}`]} -> ${recipe[`strMeasure${i}`]}</li>\n`;
            i++;
        }
        return str;           
    } 
           console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        recipies.innerHTML = "<h2>Failed to fetch recipes. Please try again later.</h2>";
    }
}

