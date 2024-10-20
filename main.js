let form= document.querySelector("form");
let input =document.getElementById("inp");
let responseDiv =document.getElementById("response");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  getdata(`https://api.github.com/users/${input.value}/repos`)
})
async function getdata(url) {
  let errorElement = document.getElementById("error-message");
  let errorreson = document.getElementById("error");
  if (errorElement) {
    errorElement.remove();
  }
  if (errorreson) {
    errorreson.remove();
  }
  try{
    let response =await fetch(url);
    let data = await response.json();
    console.log(data)

    let mainDiv= document.createElement('div');

    mainDiv.className ="items-center bg-white p-4 rounded-lg shadow-lg w-full max-w-xl m-auto mt-5";
    data.forEach(element => {
     let div = document.createElement('div');
     let divvisit = document.createElement('div');
     let res =document.createElement('h3');
     let link = document.createElement('a');  
     let span = document.createElement('span');  
     let spantext = document.createTextNode(`Stars:${element.stargazers_count}`);
     span.className="px-2 bg-yellow-300 text-white rounded-md"
     span.appendChild(spantext);
     let linktext = document.createTextNode("Visit");
     res.appendChild(document.createTextNode(element.name));
     res.appendChild(link);
     res.className =" break-all w-7/12";
     div.className="p-3 bg-gray-100 rounded-md shadow-sm m-2 flex items-center justify-between";
     link.appendChild(linktext);
     link.href =`https://github.com/${input.value}/${element.name}`;
     link.setAttribute("target","_blank");
     link.className="px-2 bg-blue-600 text-white rounded-md"
     divvisit.appendChild(link);
     divvisit.appendChild(span);
     divvisit.className="flex items-center gap-2 flex-grow justify-end flex-row"
     div.appendChild(res);
     div.appendChild(divvisit);
     mainDiv.appendChild(div);
     document.body.appendChild(mainDiv);

    });
    
  }catch(resone){
    if (!input.value) {
      let erorr=  document.createElement("h1") //console.log("Error: Input is empty.");
      erorr.setAttribute("id", "error-message");
      let texeroe = document.createTextNode("Please Enter user name")
      erorr.className = "text-red-600 mt-2 text-center";
      erorr.appendChild(texeroe)
      form.appendChild(erorr)
    
    } else {
     let  erorrs =document.createElement("h1")
     erorrs.setAttribute("id", "error");
      let texeroe = document.createTextNode(`Your User Name is Wrong, ${resone}`)
      erorrs.className = "text-red-600 mt-2 text-center";
      erorrs.appendChild(texeroe)
      form.appendChild(erorrs);
      
    }
   
  }finally{
    console.log("procces is done");
    
  }

}
