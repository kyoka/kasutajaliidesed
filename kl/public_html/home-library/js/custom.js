//****Templates****///
var login_btn_modal_template = '<a class=\"btn btn\" data-toggle=\"modal\" href=\"#myModal\"><i class=\"icon-user\"></i> Log in</a>	<a class=\"btn btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><span class=\"caret\"></span></a>	<ul class=\"dropdown-menu\">		<li>			<a href=\"#\"><i class=\"icon-pencil\"></i> Create account</a>		</li>		<li>			<a href=\"#\"><i class=\"icon-question-sign\"></i> Help</a>		</li>	</ul>';
var login_btn_modal_user_template = '<a class=\"btn btn\" data-toggle=\"modal\" href=\"#\"><i class=\"icon-user\"></i> Welcome admin</a>	<a class=\"btn btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><span class=\"caret\"></span></a>	<ul class=\"dropdown-menu\">		<li>			<a href=\"mylibrary.html\"><i class=\"icon-book\"></i> My library</a>		</li>	<li>			<a href=\"addbook.html\"><i class=\"icon-pencil\"></i> Add Book</a>		</li>	<li>			<a href=\"#\"><i class=\"icon-question-sign\"></i> Help</a>		</li>	<li>			<a href=\"\" onclick="logout();"><i class=\"icon-off\" ></i> Log out</a>		</li></ul>';
var no_search_results_template = '<legend><h2 class=\"resultsTitle\">Results <span id=\"resultsCount\" class=\"resultsCount\">(0)</span></h2><span>No results found. Please try your search again.</span></legend>';
var search_result_template = '<legend><h2 class="resultsTitle">Results <span id="resultsCount" class="resultsCount">(<%resultsCount%>)</span></h2><span class="sort_row">Sort by <a href="#">authors</a>, <a href="#">title</a>, <a href="#">publishing year</a>, <a href="#">language</a>, <a href="#">keywords</a></span></legend>';
var search_result_book_template = '<li class="media list_result"> \
									<a class="pull-left" href="#"> <img class="media-object" onclick="location.href=\'book.html?id=<%id%>\';" src="http://covers.openlibrary.org/b/olid/OL12345958M-M.jpg"> </a> \
									<div class="media-body"> \
										<a href="#" onclick="location.href=\'book.html?id=<%id%>\';"> \
											<h4 class="media-heading"><%title%></h4> \
										</a> \
										<span>Authors: </span><a href="#"><span class="text"><%author%></span></a> \
										<br/> \
										<span>Description: </span> \
										<p class="description"> \
											<%description%> \
										</p> \
										<span>Subjects: </span><span class="text"><%keywords%></span> \
										<br/> \
										<br/> \
										<span>Status: </span><span class="label label-important" id="book_status" rel="popover" data-placement="right" data-content="Available or not" data-original-title="Availability" >Not available</span> \
										<br/> \
										<br/> \
										<button class="btn btn-warning read_more_btn" onclick="location.href=\'book.html?id=<%id%>\';"> \
											Read more \
										</button> \
									</div> \
								</li> \
';
var book_template = ' <input id="<%id%>" type="hidden"></input>\
						<div class="span3" id="cover"> \
						<img src="http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg" /> \
						<div id="buttonRent"> \
							<input class="btn btn-success btn-block"  type="button" value="Available" id="statusPopover" rel="popover" data-placement="right" \
							data-content="In use: 23.02.2013 <br />Should be returned: 17.03.2013" data-original-title="Name: Louie Anderson" disabled/> \
							<input onclick="change()" class="btn btn-primary btn-block btn-primary"  type="button" value="Rent" id="rentBtn" /> \
						</div> \
					</div>	\
					<div class="span6" id="description"> \
						<div class="span6" id="bookTitle" style="display:inline; float:left;"> \
							<p> \
								<%title%> \
								<button class="btn btn-primary btn-warning" type="button" style="float:right;" onclick="window.location.href = \'editbook.html?id=<%id%>\'">Edit</button>\
							</p> \
						</div> \
						<div class="span3" id="author"> \
							<p> \
								<%author%> \
							</p> \
							<dl> \
								<dt> \
									First published in <%pub_year%> \
								</dt> \
								<dt> \
									Language: <%lang%> \
								</dt> \
								<dt> \
									Category: <%cat%> \
								</dt> \
							</dl> \
						</div> \
						<div class="span6" id="About"> \
							<dl> \
								<dt> \
									Description \
								</dt> \
								<dd> \
									<p class="moreLess"> \
										<%description%> \
									</p> \
								</dd> \
							</dl> \
						</div> \
						<div class="span6" id="tags"> \
							<dl> \
								<dt> \
									SUBJECTS \
								</dt> \
								<dd> \
									<%keywords%> \
								</dd> \
							</dl> \
						</div> \
					</div>';
var edit_book_template = '<input id="book_id" type="hidden" value="<%id%>"></input>\
							<div class="add_book"> \
								<form id="add_book_form" class="form-horizontal" action="javascript:save_book_changes()" novalidate="novalidate"  > \
									<fieldset> \
										<legend> \
											Edit book \
										</legend> \
										 <div class="control-group" id="divClass"> \
										   <label class="control-label" for="input01">Author *</label> \
										    \
										   <div class="controls"> \
											<input type="text" class="input-xlarge" id="book_author" name="book_author" placeholder="ex. Mark Twain" rel="popover" data-placement="right" data-content="Enter author first and last name" data-original-title="Author name" /> \
										   <span class="help-inline" id="author_isEmpty"  style="color:red"></span> \
										   </div>  \
										  </div> \
										  <div class="control-group" id="divClass2"> \
										   <label class="control-label" for="input01">Title *</label> \
										   <div class="controls"> \
											<input type="text" class="input-xlarge" id="book_title" name="book_title" placeholder="ex. The World War" rel="popover" data-placement="right" data-content="Enter book title" data-original-title="Book title" /> \
										   <span class="help-inline" id="title_isEmpty"  style="color:red"></span> \
										   </div> \
										  </div> \
										<div class="control-group"> \
											<label class="control-label" for="input01">Publication Year</label> \
											<div class="controls"> \
												<input type="text" class="input-mini" id="book_year" name="book_year" placeholder="ex. 2012" rel="popover" data-placement="right" data-content="Enter book publication year" data-original-title="Publication year" /> \
 \
											</div> \
										</div> \
										<div class="control-group"> \
											<label class="control-label" for="input01">Language</label> \
											<div class="controls"> \
												<select id="book_language" name="book_language" rel="popover" data-placement="right" data-content="Enter book publication language" data-original-title="Book language" > \
													<option value=""></option> \
													<option value="en">English</option> \
													<option value="et">Estonian</option> \
													<option value="ru">Russian</option> \
													<option value="de">German</option> \
													<option value="pl">Polish</option> \
												</select> \
											</div> \
										</div> \
										<div class="control-group"> \
											<label class="control-label" for="input01">Category</label> \
											<div class="controls"> \
												<select id="book_category" name="book_category" rel="popover" data-placement="right" data-content="Enter book category" data-original-title="Book category" > \
													<option value=""></option> \
													<option value="home">Home</option> \
													<option value="computers">Computers</option> \
													<option value="history">History</option> \
													<option value="business">Business</option> \
												</select> \
											</div> \
										</div> \
										<div class="control-group"> \
											<label class="control-label" for="input01">Keywords</label> \
											<div class="controls"> \
												<input type="text" class="input-xlarge" id="keywords" name="keywords" placeholder="ex. war, love, drama, Anna" rel="popover" data-placement="right" data-content="Enter keywords" data-original-title="Keywords" /> \
 \
											</div> \
										</div> \
										<div class="control-group"> \
											<label class="control-label" for="input01">ISBN</label> \
											<div class="controls"> \
												<input type="text" class="input-xlarge" id="isbn_key" name="isbn_key" placeholder="ex. 9780307962690" rel="popover" data-placement="right" data-content="Enter ISBN number" data-original-title="ISBN number" /> \
 \
											</div> \
										</div> \
										<div class="control-group"> \
											<label class="control-label" for="input01">Description</label> \
											<div class="controls"> \
												<textarea type="text" class="input-xlarge" id="description" name="description" placeholder="ex. This book about family." rel="popover" data-placement="right" data-content="Enter description" data-original-title="Enter description"></textarea> \
											</div> \
										</div> \
 \
										<div class="control-group"> \
											<label class="control-label" for="input01"></label> \
											<div class="controls"> \
												<button type="submit" class="btn addbook_form_btn" onclick=""> \
													Save changes \
												</button> \
												<div id="book_editing_status"></div> \
 \
											</div> \
 \
										</div> \
 \
									</fieldset> \
								</form> \
							</div>';
var bookStatus=false;
$(document).ready(function() {
	$('#book_author').popover({
		trigger : "hover"
	});
	$('#book_title').popover({
		trigger : "hover"
	});
	$('#book_language').popover({
		trigger : "hover"
	});
	$('#book_category').popover({
		trigger : "hover"
	});
	$('#book_year').popover({
		trigger : "hover"
	});
	$('#keywords').popover({
		trigger : "hover"
	});
	$('#isbn_key').popover({
		trigger : "hover"
	});
	$('#description').popover({
		trigger : "hover"
	});
	$('#statusPopover').popover({
		trigger : "hover",
		html : true
	});
	$('[id^="myCarousel"]').carousel();
	$('#book_status').popover({
		trigger : "hover"
	});
	$('#book_status2').popover({
		trigger : "hover"
	});
	$('#book_status3').popover({
		trigger : "hover"
	});
	$('#book_status4').popover({
		trigger : "hover"
	});

	if(checkCookie()){
		
		$('#login_btn_modal').append(login_btn_modal_user_template);
	}else{
		
		$('#login_btn_modal').append(login_btn_modal_template);
	}
	/*
	 $.getJSON("data/books.json", function(result){
	 var count=1;
	 $.each(result.books.book, function(i, field){
	 //alert(result.books.book.length);
	 if(field.rating > 5&count <= 4){
	 getBookPopular(field.isbn10, field.title, field.author);
	 count++;
	 }
	 if(result.books.book.length - i <= 4){
	 getBookNewlyAdded(field.isbn10, field.title, field.author);
	 }
	 });

	 });*/

});
$(".sign_up").click(function(currentClass) {
	if ($('#sign_up_form').attr('class') === "sign_up_form active") {
		$('#sign_up_form').removeClass("active");
	} else {
		$('#sign_up_form').addClass("active");
	}
});

$(document).ready(function() {
	lastBlock = $("#a1");
	maxWidth = 210;
	minWidth = 75;

	$("#othersBooks ul li a").hover(function() {
		$(lastBlock).animate({
			width : minWidth + "px"
		}, {
			queue : false,
			duration : 400
		});
		$(this).animate({
			width : maxWidth + "px"
		}, {
			queue : false,
			duration : 400
		});
		lastBlock = this;
	});
});
$("#btn_details").click(function() {
	if ($('#details_search_form').attr('class') === "details_search active") {
		$('#details_search_form').removeClass("active");
		$("#btn_details").text("Show advanced");

	} else {
		$('#details_search_form').addClass("active");
		$("#btn_details").text("Hide advanced");
	}

});
function getBookPopular(isbn, title, author) {

	$('#popular').append("<li class=\"span2\"><a href=\"book.html?isbn=" + isbn + "\"><div class=\"thumbnail\"><img src=\"" + "asd" + "\" alt=\"\"><h6>" + title + "</h6><p>" + author + "</p></div></a></li>");

}

function getBookNewlyAdded(isbn, title, author) {

	$('#newly_added').append("<li class=\"span2\"><a href=\"book.html?isbn=" + isbn + "\"><div class=\"thumbnail\"><img src=\"" + "asd" + "\" alt=\"\"><h6>" + title + "</h6><p>" + author + "</p></div></a></li>");

}


function myTimer()
{
	document.getElementById("top_search_input").placeholder= "Search over 4 books and articals";
	document.getElementById("searchDiv").className = "control-group";
	clearTimeout(0);
}
function myTimer2()
{
	document.getElementById("search").placeholder= "Search over 4 books and articals";
	document.getElementById("searchDiv_btn").className = "control-group";
	clearTimeout(0);
}

$('#top_search_btn').click(function() {

	if ($.trim($("#top_search_input").val()) == "") {
		document.getElementById("searchDiv").className = "control-group error";
		document.getElementById("top_search_input").placeholder= "Please type something";
		var myVar=setTimeout(function(){myTimer()},2000);
		return false;
	}
	else
	{
		window.location.href = "result.html?keyword="+document.getElementById("top_search_input").value;
	}
});

$('#btn_search_content').click(function() {

	if ($.trim($("#search").val()) == "") {
		document.getElementById("searchDiv_btn").className = "control-group error";
		$('#search').attr('placeholder', "Please type something");
		var myVar=setTimeout(function(){myTimer2()},2000);
		return false;
	}
	else
	{
		window.location.href = "result.html?keyword="+document.getElementById("search").value;
		
	}
});
function validateLoginForm() {

}

function readMore()
{
	
} 
function change() // no ';' here
{
	
	var elem = document.getElementById("rentBtn");
	if(elem.value=="Rent")
	{
     document.getElementById("statusPopover").className="btn btn-danger btn-block";
     document.getElementById("statusPopover").value="Not Available";
     document.getElementById("rentBtn").value="Rerurn";
      $('#statusPopover').data('popover').options.content = 'In use: 23.02.2013 <br />Should be returned: 17.03.2013';
    }
    else{
     document.getElementById("statusPopover").className="btn btn-success btn-block";
     document.getElementById("statusPopover").value="Available";
     document.getElementById("rentBtn").value="Rent";
     $('#statusPopover').data('popover').options.content = 'Click Rent button for renting this book';

    }
}



$("#top_search_btn").click(function(currentClass) {
	if ($.trim($("#top_search_input").val()) == "") {
		//$("#top_search_input").attr("placeholder") = "Please enter something";
	}
});
$("#top_search_input").keyup(function(event) {
	if (event.keyCode == 13) {
		$("#top_search_btn").focus();
		$("#top_search_btn").click();
	}
});
$("#search").keyup(function(event) {
	if (event.keyCode == 13) {
		$("#btn_search_content").focus();
		$("#btn_search_content").click();
	}
});

$("#login_btn").click(
		function() {

			if ($.trim($("#login_email").val()) != "") {
				if ($.trim($("#login_pass").val()) != "") {
					if ($.trim($("#login_email").val()) == "admin@admin.com"
							&& $.trim($("#login_pass").val()) == "admin") {
						setCookie("username", $.trim($("#login_email").val()));
						location.reload();
					}
				}
			}

		});


function logout() {
	if(checkCookie()){
		deleteCookie("username");
		location.reload();
	}

}



// ****Cookies setting****//

function setCookie(c_name, value) {
	document.cookie = c_name + "=" + value;

}
function deleteCookie(name)
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function checkCookie() {

	var username = getCookie("username");
	
	if (username != null && username != "" && username == "admin@admin.com") {
		return true;
	}
	return false;
}

function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}


//*****--           --*****//

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
function library_page_load(){
	search_all();
}
function search_all(){
	var result='';
	var url;
	request = new XMLHttpRequest();
	url = "../cgi-bin/search.py?searchword=<!all>";
	request.open("GET", url, true);
	request.onreadystatechange=function requestHandler() {

	  if (request.readyState == 4) {   
		   
		   if (request.status == 200) { 
			
			 if(request.responseText == 0){
				//document.getElementById(clicked_id).value="Something wrong with your request!";
				result = 'error';
			 } else {
				//alert(request.responseText);
				//result = request.responseText;
				//alert(result);
				showResults(request.responseText, 'result_block');
			 }
				
		   } else if (request.status == 404)
			 alert("Request URL does not exist");
			 
		   else
			 alert("Error: status code is " + request.status);   

	  }       
	};
	request.send(null);

}
function on_load_result(){
	var advancedSearch = [];

	var keywor='';
	if(getURLParameter("keyword")!="null")
		keyword = getURLParameter("keyword");
	else if(getURLParameter("a")!="null")
		advancedSearch[0] = getURLParameter("a");
	else if(getURLParameter("t")!="null")
		advancedSearch[1] = getURLParameter("t");
	else if(getURLParameter("p")!="null")
		advancedSearch[2] = getURLParameter("p");
	else if(getURLParameter("l")!="null")
		advancedSearch[3] = getURLParameter("l");
	else if(getURLParameter("c")!="null")
		advancedSearch[4] = getURLParameter("c");
	else if(getURLParameter("k")!="null")
		advancedSearch[5] = getURLParameter("k");
	else if(getURLParameter("i")!="null")
		advancedSearch[6] = getURLParameter("i");		
	else{
		window.location.href = "./";
		//showNoResults();
		//document.getElementsByClassName('details_search_form').style.display = 'block';
	}	

	searchAnalys(keyword, advancedSearch);	
		
}
function searchAnalys(keyword, advancedSearch){
	if(keyword != '')
		simple_search(keyword);
	else if(advancedSearch)
		advanced_search(advancedSearch);
	else
		showNoResults();
	//alert(advancedSearch[0]);
	/*if((resultJSON == 'error' || resultJSON == '') && )
		showNoResults();*/
	

}
function showNoResults(){
	document.getElementById("result_block").innerHTML = no_search_results_template;
}

function on_load_book(){
	var id;
	if(getURLParameter("id")!="null")
		id = getURLParameter("id");	
	else
		window.location.href = "./";

	getBook(id, 'simple_book');	
		
}

var request;
 
function checkAuthorAndTitle(){
	
	var stringAuthor = document.getElementById("book_author").value;
	var stringTitle = document.getElementById("book_title").value;
	
	if(stringAuthor==null || stringAuthor=="")
		{
		document.getElementById("divClass").className = "control-group error";
		document.getElementById("author_isEmpty").innerHTML="This field is required!";
	
		}
	else if(stringAuthor!=null || stringAuthor!="")
		{
		document.getElementById("divClass").className = "control-group";
		document.getElementById("author_isEmpty").innerHTML=null;
		}
	if(stringTitle==null || stringTitle=="")
	{
	document.getElementById("title_isEmpty").innerHTML="This field is required!";
	document.getElementById("divClass2").className = "control-group error";
	}
	else if(stringTitle!=null || stringTitle!="")
		{
		document.getElementById("title_isEmpty").innerHTML=null;
		document.getElementById("divClass2").className = "control-group";
		}
}

function addBook(){
	checkAuthorAndTitle();
	var url;
	request = new XMLHttpRequest();
	url = "../cgi-bin/add_book.py?adder=admin&author="+document.getElementById("book_author").value+"&title="+document.getElementById("book_title").value+"&pub_year="+document.getElementById("book_year").value+"&lang="+document.getElementById("book_language").value+"&cat="+document.getElementById("book_category").value+"&keywords="+document.getElementById("keywords").value+"&isbn="+document.getElementById("isbn_key").value+"&description="+document.getElementById("description").value;
	request.open("GET", url, true);
	request.onreadystatechange=function requestHandler() {

	  if (request.readyState == 4) {   
		   
		   if (request.status == 200) { 
			
			 if(request.responseText == 1){
				document.getElementById("add_book_form").reset();
				document.getElementById("book_adding_status").innerHTML="<p class=\"text-success\">Book successfully added!</p>";
				document.getElementById("book_adding_status").style.visibility="visible";
			 } else if(request.responseText == 0){
				document.getElementById("book_adding_status").innerHTML="<p class=\"text-error\">Something wrong! Can`t add to db! Try later</p>";
				document.getElementById("book_adding_status").style.visibility="visible";
			 }
				
		   } else if (request.status == 404)
			 alert("Request URL does not exist");
		   else
			 alert("Error: status code is " + request.status);   
	  }       
	};
	request.send(null);	
}
function getBook(id, method){
	var result='';
	var url;
	request = new XMLHttpRequest();
	url = "../cgi-bin/complaint.py?id="+id;
	request.open("GET", url, true);
	request.onreadystatechange=function requestHandler() {

	  if (request.readyState == 4) {   
		   
		   if (request.status == 200) { 
			
			 if(request.responseText == 0){
				//document.getElementById(clicked_id).value="Something wrong with your request!";
				result = 'error';
			 } else {
				if(method == 'edit_book')
					showEditBook(request.responseText);
				else if(method == 'simple_book')
					showBook(request.responseText, 'bookContent');
			 }
				
		   } else if (request.status == 404)
			 alert("Request URL does not exist");
			 
		   else
			 alert("Error: status code is " + request.status);   

	  }       
	};
	request.send(null);
	//return result;
}	
function simple_search(keyword){
	var result='';
	var url;
	request = new XMLHttpRequest();
	url = "../cgi-bin/search.py?searchword="+keyword;
	request.open("GET", url, true);
	request.onreadystatechange=function requestHandler() {

	  if (request.readyState == 4) {   
		   
		   if (request.status == 200) { 
			
			 if(request.responseText == 0){
				//document.getElementById(clicked_id).value="Something wrong with your request!";
				result = 'error';
			 } else {
				//alert(request.responseText);
				//result = request.responseText;
				//alert(result);
				showResults(request.responseText, 'result_block');
			 }
				
		   } else if (request.status == 404)
			 alert("Request URL does not exist");
			 
		   else
			 alert("Error: status code is " + request.status);   

	  }       
	};
	request.send(null);
	//return result;
	
}
function advanced_search(advancedSearch){};
function showResults(resultsJson, placeId){
	var books = JSON.parse(resultsJson);
	var i=0;
	var results = '';
	var book = '';
	for(var book in books){
		book = search_result_book_template;		
		book = book.replace("<%title%>",books[i].title);
		book = book.replace("<%id%>",books[i].id);
		book = book.replace("<%id%>",books[i].id);
		book = book.replace("<%id%>",books[i].id);
		book = book.replace("<%author%>",books[i].author);
		book = book.replace("<%description%>",books[i].description);
		book = book.replace("<%keywords%>",books[i].keywords);
		results = results + '' + book;
		//alert(books[i].author);
		i++;
	}
	//alert(resultsJson);
	var pagination='';
	if(i==0)
		showNoResults();
	for(var y = 0; y <= Math.round(i/5); y++){
		//alert(Math.round(i/10));
		pagination = pagination + '<li>\
										<a href="#">' + (y+1) + '</a>\
									</li>';
	}
	var htmlString = search_result_template.replace("<%resultsCount%>",i) + '<ul class="media-list">' +results + '</ul>';
	htmlString = htmlString + '<div class="pagination">  \
								<ul> \
									<li> \
										<a href="#">Prev</a> \
									</li> ' + pagination + '<li> \
										<a href="#">Next</a>\
									</li>\
								</ul>\
							</div>';
	document.getElementById(placeId).innerHTML=htmlString;
}
function showBook(resultsJson, placeId){
	var books = JSON.parse(resultsJson);
	var i=0;
	var results = '';
	var book = '';
	book = book_template;		
	book = book.replace("<%title%>",books[i].title);
	book = book.replace("<%id%>",books[i].id);
	book = book.replace("<%id%>",books[i].id);
	book = book.replace("<%author%>",books[i].author);
	book = book.replace("<%description%>",books[i].description);
	book = book.replace("<%keywords%>",books[i].keywords);
	book = book.replace("<%pub_year%>",books[i].pub_year);
	if(books[i].lang == 'en')
		book = book.replace("<%lang%>",'English');
	else
		book = book.replace("<%lang%>",books[i].lang);
	book = book.replace("<%cat%>",books[i].cat);
	results = results + '' + book;
	
	
	var htmlString = results;
	
	document.getElementById(placeId).innerHTML=htmlString;
}
function index_page_load(){
	search_all();
}
function edit_book_content_load(){
	showEditBookContent('edit_book');
}
function showEditBookContent(placeId){
	var htmlString = edit_book_template;
	var i='';
	if(getURLParameter("id")!="null")
		id = getURLParameter("id");		
	htmlString = htmlString.replace("<%id%>", id);	
	document.getElementById(placeId).innerHTML=htmlString;
	getBook(id, 'edit_book');
	
}
function showEditBook(resultsJson){
	var books = JSON.parse(resultsJson);
	var i=0;
	document.getElementById('book_author').value=books[i].author;
	document.getElementById('book_title').value=books[i].title;
	document.getElementById('book_year').value=books[i].pub_year;
	document.getElementById('book_language').value=books[i].lang;
	document.getElementById('book_category').value=books[i].cat;
	document.getElementById('keywords').value=books[i].keywords;
	document.getElementById('isbn_key').value=books[i].isbn;
	document.getElementById('description').value=books[i].description;
}
function save_book_changes(){
	var id = document.getElementById('book_id').value;
	var author = document.getElementById('book_author').value;
	var title = document.getElementById('book_title').value;
	var year = document.getElementById('book_year').value;
	var language = document.getElementById('book_language').value;
	var category = document.getElementById('book_category').value;
	var keywords = document.getElementById('keywords').value;
	var isbn = document.getElementById('isbn_key').value;
	var description = document.getElementById('description').value
	
	checkAuthorAndTitle();
	var url;
	request = new XMLHttpRequest();
	url = "../cgi-bin/edit_book.py?adder=admin&id="+id+"&author="+author+"&title="+title+"&pub_year="+year+"&lang="+language+"&cat="+category+"&keywords="+keywords+"&isbn="+isbn+"&description="+description;
	request.open("GET", url, true);
	request.onreadystatechange=function requestHandler() {

	  if (request.readyState == 4) {   
		   
		   if (request.status == 200) { 
			 if(request.responseText == 1){				
				document.getElementById("book_editing_status").innerHTML="<p class=\"text-success\">Book successfully changed!</p>";
				document.getElementById("book_editing_status").style.visibility="visible";
			 } else if(request.responseText == 0){
				document.getElementById("book_editing_status").innerHTML="<p class=\"text-error\">Something wrong! Can`t add to db! Try later</p>";
				document.getElementById("book_editing_status").style.visibility="visible";
			 }
				
		   } else if (request.status == 404)
			 alert("Request URL does not exist");
		   else
			 alert("Error: status code is " + request.status);   
	  }       
	};
	request.send(null);	
	
	
}