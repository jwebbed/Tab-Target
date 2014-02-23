var storage = chrome.storage.sync;

var arr = [];

loadSettings();

function loadSettings() {
  storage.get('sites', function (items) {
    if (items['sites']) {
      arr = items['sites'];
      for (i = 0; i < arr.length; i++) {
        $("#saved").append("<li id='" + i + "'><span class='first'>" + arr[i]
                            + "<div class='del'></div></li>");
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


$("#save").click(function () {
  var site= $("#site").val();

  if (site == "") {
    alert('Please fill in the field!');
    return;
  }

  arr.push(site);

  $("#saved").append("<li><span class='first'>" + site + "</span></li>");
  storage.set({'sites': arr});

  $("#site").val("");
});