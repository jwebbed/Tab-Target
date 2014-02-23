var storage = chrome.storage.sync;

var arr = [];

loadSettings();

function loadSettings() {
  storage.get('sites', function (items) {
    if (items['sites']) {
      arr = items['sites'];
      for (i = 0; i < arr.length; i++) {
        $("#saved").append("<li id='" + i + "'><span class='first'>" + arr[i]
                            + "</span><div class='del'></div></li>");
        $('#' + i + ' .del').click(function () {
          $(this).parent().css("display", "none");
          var pos = arr.indexOf(i);
          if (~arr) arr.splice(pos, 1);
          storage.set({'sites': arr});
        });
      }
    }
  });
}

$("#addsite").keydown(function (e) {
  if (e.which == 13) {
    $("#save").click();
    $("#site").focus();
  }
});

$("#save").click(function () {
  var site= $("#site").val();
  var re = new RegExp("^(https?:\/\/)+([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$");

  if (!re.test(site)) {
    alert('Please enter a valid URL');
    return;
  }

  arr.push(site);

  $("#saved").append("<li id='" + (arr.length - 1) + "''><span class='first'>" + site + "</span><div class='del'></div></li>");
  $('#' + (arr.length - 1) + ' .del').click(function() {
    $(this).parent().css("display", "none");
    var pos = arr.indexOf(i);
    if (~arr) arr.splice(pos, 1);
    storage.set({'pass': arr});
  });
  storage.set({'sites': arr});

  $("#site").val("");
});