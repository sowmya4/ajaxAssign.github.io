$(document).ready(()=>{
let imdb_id,title,year;
let url = 'http://www.omdbapi.com/?apikey=9c5c424d&';
let serializeData;
$('#search').click(function(){
    serializeData =  $(" :input[value]").serializeArray();
	console.log("serializeData is",serializeData);
     // serializedData = serializeData.replace(/&?[^=]+=&|&[^=]+=$/g,'');
     // console.log("serialized Data is",serializedData);
      let appendUrl = '';
     $.each(serializeData,function(index,field){
        console.log("field is",field);
        if(field.value!=''){
            let newval = field.name + "=" + field.value + "&";
            appendUrl= appendUrl+newval;
            console.log("append url is",appendUrl);
            }
        })
     url = url+appendUrl;
     url = url.substring(0, url.length - 1);
     console.log("the new url is", url);
     getData(url);
     url =  'http://www.omdbapi.com/?apikey=9c5c424d&';
     
});

// $('#search').click(function(){
// 		imdb_id = 	$("#first").val();
// 		title = $("#second").val();
// 		year = $("#third").val();
// 		console.log(imdb_id+''+title+''+year);	
// 		if(imdb_id != ''){
//          url = `${url}&i=${imdb_id}`;
//          imdb_id='';	
//          console.log("url is",url);
//          }
//         if(title != ''){
//          url =`${url}&t=${title}`;
//          title='';
//          console.log("url is",url)	
//          }
//          if(year != ''){
//          url = `${url}&y=${year}`;		
//          year='';
//          console.log("url is",url)	
//          }
//          getData(url);
// })
$('#changeVal').click(function(){
	url='http://www.omdbapi.com/?apikey=9c5c424d&';
	console.log("url is",url);	
})
});
let getData = (url)=>{ /*ajax call by passing url as argument*/
 $('#first').attr('value','');
 $.ajax({
 	type: 'GET',
 	dataType:'json',
 	async: true,
 	url: url,
 	success: function(data,status){
     alert("success");
     // if(data.Response== "False"){
     //    alert("Sorry, There is no movie with given entry in our db");

     // }
     switch(data.Response){
     case 'False':
     alert("there is no data");
     break;
     case 'True':
     responseData = data;
     console.log("the data is",responseData);
     console.log("the plot is",responseData.Plot);
     $("#myimg").attr("src",responseData.Poster);
     $(".figure-caption").text(responseData.Genre);
     let headerrow = `<h4> ${responseData.Title}</h4>
                      <div class="imdb ml-md-auto">
                      <span class="rating">${responseData.imdbRating} ImdbRating</span>&nbsp
                      <span class="votes"> ${responseData.imdbVotes}Imdbvotes</span></div>`
     $(".head").html(headerrow);
     $("#plot").html(`<b>Plot</b>:<br>${responseData.Plot}`);
     let temprow = `<p><b>Director</b>: ${responseData.Director}</p>
                    <p><b>Actors</b>: ${responseData.Actors}</p> 
                    <p><b>Awards</b>:${responseData.Awards}</p>
                    <p><b>Production</b>:${responseData.Production}</p>
                    <p><b>Website</b>:<a href="${responseData.Website}">${responseData.Website}</a></p> `
     $("#plot").append(temprow);
     $("#writers").text(responseData.Writer);
     let addrow = '',addRating='';
     for(let x of  responseData.Ratings){
        
        addrow = addrow +`<p class="pr-1">${x.Source}:</p><p class="pr-2"><b>${x.Value}</b></p>`
        console.log("addrow is",addrow);
     }
     $(".first").html(addrow); 
      $(".second").html(addRating); 
     $(".container").removeClass("d-none");    
      break;
 	}
   },
 	error: function(status){
      alert("some error has occurred");
 	}
 })
 
}


    		







