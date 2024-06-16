const height = window.innerHeight;
const width = window.innerWidth;
var book_title=[],book_author=[],book_publisher=[],image_links=[],book_published_date=[],book_descript=[]; 
var url;
let search_button=document.getElementById("search-btn");
let reset_button=document.getElementById("reset-btn");
// console.log(reset_button)
search_button.addEventListener("click",()=>{
    //console.log(user_input);
    let user_input=document.getElementById("user_input").value.trim();
    if(!user_input){
        alert("Please enter a search term.");
        return;
    } 
    let safe_the_input=sanitizeInput(user_input)
    url="https://www.googleapis.com/books/v1/volumes?q="+encodeURIComponent(safe_the_input);
//to get the url from the search bar which i created
var container_text=document.getElementById("text");
fetch(url)
.then(response => response.json())
.then(data =>{
    for(let i=0;i<10;i++){
        if (!Wrong_terms(data.items[i].volumeInfo.title) && !Wrong_terms(data.items[i].volumeInfo.title)) {
            let access_author_one = data.items[i].volumeInfo.authors[0];
            book_author.push(escapeHtml(access_author_one));
            book_title.push(escapeHtml(data.items[i].volumeInfo.title));
            book_descript.push(escapeHtml(data.items[i].volumeInfo.description ? data.items[i].volumeInfo.description : 'No description available'));
            image_links.push(data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'); 
            book_publisher.push(escapeHtml(data.items[i].volumeInfo.publisher ? data.items[i].volumeInfo.publisher : 'Unknown Publisher'));
            book_published_date.push(escapeHtml(data.items[i].volumeInfo.publishedDate ? data.items[i].volumeInfo.publishedDate : 'Unknown'));
     }else{
            alert("Warning");
            location.reload();
            break;
        }
    }
    container_text.remove();
    // console.log(book_link)
    test_the_code(book_title,image_links,book_author,book_publisher,book_descript,book_published_date);
}

) 
.catch(error => {
    console.error('Error fetching data:', error);
    alert('Error fetching data. Please try again later.');
}); 
})
//bt-->book title
//image-->book image
//ba-->book author
//bp-->book publisher
//bd-->book descript
//pd-->published date
let control_flow=0;
var card_div=document.createElement("div");
card_div.classList.add("card-div");
function test_the_code(bt,image,ba,bp,bd,pd){
    let container=document.getElementById("container");
    container.appendChild(card_div);

   for(let i=0;i<bt.length;i++){
   let div=document.createElement("div");  //reference--> i create a div tag
   div.classList.add("card")   
      //reference--> i create a container as a section to append all of my cards
   card_div.appendChild(div) //append the div to the container section
   let img=document.createElement("img");
   let bookTitle=document.createElement("span");//book title
   bookTitle.classList.add("title");
   let bookAuthor=document.createElement("span");//book author
   bookAuthor.classList.add("author-name");
   let BookPublisher=document.createElement("span");//book publisher
   BookPublisher.classList.add("publisher");
   let bookDate=document.createElement("span");
   bookDate.classList.add("date")
   let btn=document.createElement("button");
   let btn_text=document.createTextNode("Description");
   //console.log(anchor_tag);
   img.src=image[i];
   bookTitle.innerHTML=bt[i];//book title
   div.appendChild(img);
   div.appendChild(bookTitle);
   btn.appendChild(btn_text);
   div.appendChild(btn);
    btn.addEventListener("click",()=>{
    display_description(bt[i],image[i],ba[i],bp[i],pd[i],bd[i]);
   })
}
}
reset_button.addEventListener("click",()=>{
    location.reload();
})

function display_description(Title1,image1,author,publish,date,descript){
    card_div.style.filter="blur(10px)";
    let main_container=document.getElementById("container")
    let display_div=document.createElement("div");
    display_div.classList.add("popup-div");
    let display_div1=document.createElement("div")
    display_div1.classList.add("popup-container");
    main_container.appendChild(display_div);
    display_div.appendChild(display_div1)
    // create a tag to display the content in div
    let img=document.createElement("img");
    let h1=document.createElement("h1");
    h1.classList.add("author");
    let pb=document.createElement("span");
    pb.classList.add("publish")
    let d=document.createElement("span");
    let des=document.createElement("p");
    let btn1=document.createElement("button");
    btn1.classList.add("fa-solid");
    btn1.classList.add("fa-xmark")
    d.classList.add("date");
    img.src=image1;
    h1.innerHTML=`<span>Author:${author}</span>`;
    pb.innerHTML=publish;
    d.innerHTML=date;
    des.innerHTML=descript;
    display_div1.append(img, h1, pb, d, des, btn1);//append the element to popup div
    btn1.addEventListener("click",()=>{
      card_div.style.filter="blur(0px)";
      display_div.remove();
    })
}

//The below funnction is helps to protect the site
function Wrong_terms(text) {
    const wrong_word = ['explicit', 'inappropriate', 'adult', 'violence', 'profanity','adult content'];
    for (const term of wrong_word) {
        if (text.toLowerCase().includes(term)) {
            return true;
        }
    }
}
function sanitizeInput(input) {
    return input.replace(/[^\w\s]/gi, '');
}
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
