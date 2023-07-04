$(function () {
  // object to save the memos for each hour
  var localMemos = {
    9: " ",
    10: " ",
    11: " ",
    12: " ",
    13: " ",
    14: " ",
    15: " ",
  };

  // add the current day to top of page
  $("#currentDay").text(dayjs().format("MMM D, YYYY"));

  // get the current time, if its currently the afternoon add 12 to make it military time
  var currentTime = Number(dayjs().format("h"));
  if (dayjs().format("a")[0] == "p") currentTime += 12;

  // initialize the local storage with empty json
  if (!localStorage.getItem("localMemos"))
    localStorage.setItem("localMemos", JSON.stringify(localMemos));

  // event listner if one of the save buttons's have been clicked
  $(".saveBtn").click(function (e) {
    e.preventDefault();

    // figure out if the user clicked on the outside blue button or the inside save icon
    let currentTarget = $(e.target);
    if (currentTarget.is("button")) currentTarget = currentTarget.parent();
    else currentTarget = currentTarget.parent().parent();

    // grab the hour from the div by excluding the hour part
    let currentHour = String(currentTarget.attr("id").replace(/hour-/g, ""));

    // grab the memo written by the user and add it to the object at it's respected time
    localMemos[currentHour] = currentTarget.children("textarea").val();

    // add the memos to local storage
    localStorage.setItem("localMemos", JSON.stringify(localMemos));
  });

  // loop through all the time block divs
  for (let timeBlock of $(".time-block")) {
    // grab the hour from the div by excluding the hour part
    let currentHour = Number($(timeBlock).attr("id").replace(/hour-/g, ""));

    // set the time block with data saved in local storage for that respected time
    $(timeBlock)
      .children("textarea")
      .val(JSON.parse(localStorage.getItem("localMemos"))[String(currentHour)]);

    // evaluate the current hour form the div to the current time
    // add present class if they're the same, past if it's past, and future if the current div is not the current time
    // each class allows jquery to set a specific color red, gray, or green
    if (currentHour == currentTime) timeBlock.classList.add("present");
    if (currentHour < currentTime) timeBlock.classList.add("past");
    if (currentHour > currentTime) timeBlock.classList.add("future");
  }

  // trigger the save button for all of the hours so that local storage saves everything from the begning
  $(".saveBtn").trigger("click");
});
