/**
 * @author Vladimir Ivanov and Jevgeni Krutov
 */
$(document).ready(function() {
	$("#mainSearchField").focus();

	$("#mainSearchField").keyup(function(event) {
		if (event.keyCode == 13) {
			$("#zoomingToolButton").focus();
			$("#zoomingToolButton").click();
		}
	});

	$(function() {
		window.prettyPrint && prettyPrint();
		$('#dp1').datepicker({
			format : 'mm-dd-yyyy'
		});
		$('#dp2').datepicker();
		$('#dp3').datepicker();
		$('#dp3').datepicker();
		$('#dpYears').datepicker();
		$('#dpMonths').datepicker();

		var startDate = new Date(2012, 1, 20);
		var endDate = new Date(2012, 1, 25);
		$('#dp4').datepicker().on('changeDate', function(ev) {
			if (ev.date.valueOf() > endDate.valueOf()) {
				$('#alert').show().find('strong').text('The start date can not be greater then the end date');
			} else {
				$('#alert').hide();
				startDate = new Date(ev.date);
				$('#startDate').text($('#dp4').data('date'));
			}
			$('#dp4').datepicker('hide');
		});
		$('#dp5').datepicker().on('changeDate', function(ev) {
			if (ev.date.valueOf() < startDate.valueOf()) {
				$('#alert').show().find('strong').text('The end date can not be less then the start date');
			} else {
				$('#alert').hide();
				endDate = new Date(ev.date);
				$('#endDate').text($('#dp5').data('date'));
			}
			$('#dp5').datepicker('hide');
		});

		// disabling dates
		var nowTemp = new Date();
		var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

		var checkin = $('#dpd1').datepicker({
			onRender : function(date) {
				return date.valueOf() < now.valueOf() ? 'disabled' : '';
			}
		}).on('changeDate', function(ev) {
			if (ev.date.valueOf() > checkout.date.valueOf()) {
				var newDate = new Date(ev.date)
				newDate.setDate(newDate.getDate() + 1);
				checkout.setValue(newDate);
			}
			checkin.hide();
			$('#dpd2')[0].focus();
		}).data('datepicker');
		var checkout = $('#dpd2').datepicker({
			onRender : function(date) {
				return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
			}
		}).on('changeDate', function(ev) {
			checkout.hide();
		}).data('datepicker');
	});

	var booksPerPage = 5;
	var library;

	$.getJSON('test.json', function(data) {

		///
		$("#navLogo").click(function() {
			navSearch();
		});
		$("#navSearch").click(function() {
			navSearch();
		});
		$("#navPlan").click(function() {
			navPlan();
		});
		$("#navLibrary").click(function() {
			navLibrary();
		});
		$("#navRequests").click(function() {
			navRequests();
		});
		$("#navOnHands").click(function() {
			navOnHands();
		});
		///
		function navSearch() {
			navReset();
			$("#navSearch").addClass("active");
			$(".rentButton").show();

			$(".authorsSpan").show();
			$(".categoriesSpan").show();
			$(".tagsSpan").show();
		}

		function navPlan() {
			navReset();
			$("#navPlan").addClass("active");
			$(".rentButton").show();

			$(".authorsSpan").show();
			$(".categoriesSpan").show();
			$(".tagsSpan").show();
		}

		function navLibrary() {
			navReset();
			$("#navLibrary").addClass("active");
			$(".editButton").show();
			$(".addNewBookButton").show();

			$(".authorsSpan").show();
			$(".categoriesSpan").show();
			$(".tagsSpan").show();
		}

		function navRequests() {
			navReset();
			$("#navRequests").addClass("active");
			$(".requestedByLable").show();
			$(".requesteeLable").show();
			//$(".conditionLable").show();

			$(".accept-declineGroup").show();
			$(".acceptButton").show();
			$(".declineButton").show();
		}

		function navOnHands() {
			navReset();
			$("#navOnHands").addClass("active");
			$(".currentReaderLable").show();

		}

		function navReset() {
			$("#navSearch").removeClass("active");
			$("#navPlan").removeClass("active");
			$("#navLibrary").removeClass("active");
			$("#navRequests").removeClass("active");
			$("#navOnHands").removeClass("active");

			$(".rentButton").hide();
			$(".editButton").hide();
			$(".addNewBookButton").hide();
			$(".addYourBookHeading").hide();

			$(".conditionLable").hide();
			$(".requesteeLable").hide();
			$(".requestedByLable").hide();
			$(".currentReaderLable").hide();

			$(".acceptButton").hide();
			$(".declineButton").hide();
			$(".accept-declineGroup").hide();
			
			$(".acceptedButton").hide();
			$(".declinedButton").hide();

			$(".errorMessage").hide();
			$(".successMessage").hide();

			$(".authorsSpan").hide();
			$(".categoriesSpan").hide();
			$(".tagsSpan").hide();

		}

		//-------------------------------------------
		var currentPage = 1;
		library = data;
		var booksAmount = library.books.length;
		var pagesNum = Math.floor(booksAmount / booksPerPage) + (booksAmount % booksPerPage);

		var tabulator;
		tabulator = "<ul><li id=\"tabArrowLeft\"><a href=\"#\">&laquo;</a></li>";
		for (var n = 1; n <= pagesNum; n++) {
			tabulator += "<li class=\"someTab\" tabNr=\"" + n + "\" id=\"myTab" + n + "\"><a href=\"#\">" + n + "</a></li>";
		};
		tabulator += "<li id=\"tabArrowRight\"><a href=\"#\">&raquo;</a></li></ul>";

		document.getElementById("page-selection").innerHTML += tabulator;

		getPage(currentPage);

		var colors = ["Tallinn, Estonia", "New York, USA", "Moscow, Russia", "Tartu, Estonia", "Narva, Estonia", "New-Jersey, USA"];
		$('#fieldLocation').typeahead({
			source : colors
		});
		// Filling page with books
		$(".someTab").click(function() {
			$(".someTab").removeClass("active");
			$(this).addClass("active");
			var tabNr = $(this).attr("tabNr");
			getPage(tabNr)
			//currentPage=tabNr;
			//refreshBooks();
		});

		$("#tabArrowLeft").click(function() {
			if (currentPage != 1)
				getPage(currentPage - 1);
		});
		$("#tabArrowRight").click(function() {
			if (currentPage != pagesNum)
				getPage(currentPage + 1);
		});

		$('#myModalEdit').on('shown', function() {
			$('#title').focus();
			$('body').css('overflow', 'hidden');
		}).on('hidden', function() {
			$('body').css('overflow', 'auto');

		});

		$('#myModal').on('shown', function() {
			$('#title').focus();
			$('body').css('overflow', 'hidden');
		}).on('hidden', function() {
			$('body').css('overflow', 'auto');

		});

		$('#modalPref').on('shown', function() {
			$('#title').focus();
			$('body').css('overflow', 'hidden');
		}).on('hidden', function() {
			$('body').css('overflow', 'auto');

		});

		$(".saveChangesBtn").click(function() {
			var title = document.getElementById('title').value;
			var author = document.getElementById('author').value;
			var description = document.getElementById('new_description').value;
			var isbn = document.getElementById('isbn').value;

			var isEmptyFields = false;
			var isbnCheck = true;
			var descriptionCheck = true;

			if (title == "") {
				isEmptyFields = true;
				$(".errorMessage").show();
				$(".successMessage").hide();
				$(".errorMessage").text("Empty field!!!");
			}
			if (author == "") {
				isEmptyFields = true;
				$(".errorMessage").show();
				$(".successMessage").hide();
				$(".errorMessage").text("Empty field!!!");
			}
			if (description == "") {
				isEmptyFields = true;
				$(".errorMessage").show();
				$(".successMessage").hide();
				$(".errorMessage").text("Empty field!!!");
			}
			if (isbn == "") {
				isEmptyFields = true;
				$(".errorMessage").show();
				$(".successMessage").hide();
				$(".errorMessage").text("Empty field!!!");
			}
			if (isbn.length < 10) {
				isbnCheck = false;
				$(".errorMessage").show();
				$(".successMessage").hide();
				$(".errorMessage").text("ISBN should contain from 10 numbers!!!");
			}
			if (description.length > 320) {
				descriptionCheck = false;
				$(".errorMessage").show();
				$(".successMessage").hide();
				$(".errorMessage").text("Description maximum length is 320 letters!!!");

			}
			if (!isEmptyFields && isbnCheck && descriptionCheck) {
				$(".errorMessage").hide();
				$(".successMessage").show();
				$(".successMessage").text("All changes saved!");
				$("#myModalEdit").modal("hide");

			}

		});

		function getPage(K) {
			$("#tabArrowLeft").removeClass("disabled");
			$("#tabArrowRight").removeClass("disabled");
			$(".someTab").removeClass("active");

			currentPage = K;
			$("[tabNr='" + currentPage + "']").addClass("active");

			if (currentPage == 1) {
				$("#tabArrowLeft").addClass("disabled");
			}
			if (currentPage == pagesNum) {
				$("#tabArrowRight").addClass("disabled");
			}
			refreshBooks();
		}

		function refreshBooks() {
			document.getElementById("books").innerHTML = "<div></div>"

			var firstBook = ((currentPage - 1) * booksPerPage) + 1;
			var lastBook;
			if (currentPage == pagesNum) {
				lastBook = booksAmount
			} else {
				lastBook = currentPage * booksPerPage;
			}
			for (var i = firstBook - 1; i <= lastBook - 1; i++) {
				var daysBookTaken = 10 + Math.floor(Math.random() * 75);
				var badgeClass = " ";
				if(daysBookTaken > 30) {
					badgeClass = " badge-warning";
				};
				if(daysBookTaken > 50) {
					badgeClass = " badge-important";
				};
				
				var bookEntry = 
				//'imageFrame div' starts:
				"<div class=\"row\"><div class=\"imageFrame\">" +
				"<a class=\"\" data-toggle=\"modal\">" +
				"<img src=\"http://covers.openlibrary.org/b/isbn/" + data.books[i].isbn + "-M.jpg\"/></a></div>" +
				"<div class=\"infoFrame\">" +
				
				//Title
				"<div><h4><strong><p>" + data.books[i].title + "</p></strong></h4></div>" +
				
				//'Ready to lend' lable:
				"<span class=\"label label-success conditionLable\">Ready to lend</span><br/>" +
				
				//'Advanced info' link:
				"<a class=\"accordion-toggle\" data-toggle=\"collapse\"  href=\"#collapseTwo\">" +
				"<span class=\"handVis\" data-toggle=\"collapse\" data-target=\"#advancedInfo" + i + "\">Book details</span></a>" +
				
				//Advanced info itself (including description):
				"<div id=\"advancedInfo" + i + "\" class=\"collapse out\"><br/>" +
				
				"<p>" + data.books[i].description + "</p>" +
				"<ul>" +
				"<li>Release date: " + data.books[i].releaseDate + "</li>" +
				"<li>Language: " + data.books[i].lang + "</li>" +
				"<li>ISBN: " + data.books[i].isbn + "</li>" +
				"</ul>" +
				"</div><br/>" +
				
				//'Available for rent' button:
				"<a class=\"btn btn-small btn-primary rentButton\" href=\"#myModal\" role=\"button\" data-toggle=\"modal\">Available for rent</a>" +
				
				//Edit-button:
				"<a class=\"btn btn-small btn-success editButton\" href=\"#myModalEdit\" role=\"button\" data-toggle=\"modal\">Edit</a><span> </span>" +
				
				//Accept/Decline button group:
				"<span orderNr=\"" + i + "\" class=\"btn-group accept-declineGroup\">" +
				"<a orderNr=\"" + i + "\" class=\"btn btn-small btn-success acceptButton\" role=\"button\"data-toggle=\"modal\">Accept</a>" +
				"<a orderNr=\"" + i + "\" class=\"btn btn-small btn-danger declineButton\"href=\"#\"role=\"button\"data-toggle=\"modal\">Decline</a> " +
				"</span>" +
				
				//Accepted btn:
				"<a orderNr=\"" + i + "\" class=\" acceptedButton btn btn-small btn-success\" href=\"#\" role=\"button\" data-toggle=\"modal\">Accepted</a>" +
		
				//Declined btn:
				"<a orderNr=\"" + i + "\" class=\"btn btn-small btn-danger declinedButton\" href=\"#\" role=\"button\" data-toggle=\"modal\">Declined</a> " +

				
				//'Requested by' lable:
				"<span class=\"requestedByLable\">" +
				"<span class=\"muted\"> requested by: </span><i class=\"icon-user\"></i> John Doe</span>" +
				
				//'Current reader' lable:
				"<span class=\"currentReaderLable\">" +
				"<span class=\"muted\">taken by: </span><i class=\"icon-user\"></i> Bazil Pupkin  " +
				"<span class=\"badge " + badgeClass + "\">" + daysBookTaken + "</span>" +
				"<span class=\"muted\">  days ago </span>" +
				"</span>" +
				
				//Authors:
				"<span class=\"authorsSpan\"><i class=\"icon-pencil\"></i>" +
				"<span class=\"muted\">authors: </span>" + data.books[i].author +
				"</span>" +
				
				
				//Categories:
				"<span class=\"categoriesSpan\"> | <i class=\"icon-tasks\"></i> " +
				"<span class=\"muted\">categories: </span>" + data.books[i].category +
				"</span>" +
				
				
				//Tags:
				"<span class=\"tagsSpan\"> | <i class=\"icon-tags\"></i> " +
				"<span class=\"muted\">tags: </span><a>" +
				"<span class=\"label label-info microTag\">" + data.books[i].tags + "</span></a>" +
				"</span>" +
				
				"</div>" + //-infoFrame ends
				"</div><hr>";
				
				document.getElementById("books").innerHTML += bookEntry;
			}

			$(".acceptButton").click(function() {
				$(".accept-declineGroup").hide();
				$(".acceptedButton").show();
			});
			$(".acceptedButton").click(function() {
				$(".acceptedButton").hide();
				$(".accept-declineGroup").show();
			});
			$(".declineButton").click(function() {
				$(".accept-declineGroup").hide();
				$(".declinedButton").show();
			});
			$(".declinedButton").click(function() {
				$(".declinedButton").hide();
				$(".accept-declineGroup").show();
			});
			
			navReset();
			$(".rentButton").show();
			$("#navSearch").addClass("active");

			$(".authorsSpan").show();
			$(".categoriesSpan").show();
			$(".tagsSpan").show();

			$("#sendRequestBtn").click(function() {

				if ($(this).hasClass("btn-warning")) {
					$(this).removeClass("btn-warning");
				} else {
					$(this).addClass("btn-warning");
				}

				$(this).text($(this).text() == 'Request sent' ? 'Send request' : 'Request sent');
				return false;

			});

			$("#addMyNewBookBtn").click(function() {
				$(".addYourBookHeading").show();
			});
			$("#editButton").click(function() {
				$(".addYourBookHeading").hide();
				$(".errorMessage").hide();
				$(".successMessage").hide();
			});

		}

	});
});
