function getTopten(topComments) {
	var className = '_no_';
	var id = '_no_';
	for (var i = 0; i < 10; i++) {
		if (i<3) {
			className = className + (i+1);
			$("#topten").append("<tr><td>" 
				+ "<span class='badge " + ('_no_' + (i + 1)) +"'>" + (i + 1) + "</span>" + "</td><td>" 
				+ topComments[i].musicName + "</td><td>" 
				+ topComments[i].artistName + "</td><td>"
				+ topComments[i].comments + "</td><td>" 
				+ "<span class='label label-primary' id='" + ('_no_' + (i + 1)) +"' onclick='show(this)' data-toggle='modal' data-target='#" + ('_no_' + (i + 1)) + "'>" + "Listen" + "</span>" 
				+ "</td></tr>");
			className = '_no_';
		} else {
			$("#topten").append("<tr><td>" 
				+ "<span class='badge'>" + (i + 1) + "</span>" + "</td><td>" 
				+ topComments[i].musicName + "</td><td>" 
				+ topComments[i].artistName + "</td><td>"
				+ topComments[i].comments + "</td><td>"
				+ "<span class='label label-primary' id='" + ('_no_' + (i + 1)) +"' onclick='show(this)' data-toggle='modal' data-target='#" + ('_no_' + (i + 1)) + "'>" + "Listen" + "</span>"
				+"</td></tr>");
		}
	}
}
function show(sp) {
	var modalId = sp.id;
	var modalLabel = sp.id + 'Label';
	var id = parseInt(modalId.substr(4)) - 1;
	console.log(id);
	$("#start").append(
		"<div class='modal fade jx-modal' id='" + modalId + "' tabindex='-1' role='dialog' aria-labelledby='" + modalLabel +"' aria-hidden='true'>" 
		+ "<div class='modal-dialog'>"
		+ "<div class='modal-content'>"
		+ "<div class='col-md-12 jx-list'>"
		+ "<div class='col-md-4 jx-img'>"
		+ "<img src='" + topComments[id].blurPicUrl + "'>"
		+ "</div>"
		+ "<div class='col-md-8'>"
		+ "<ul class='list-group'>"
		+ "<li class='list-group-item'>" + "<span class='col-md-3 label label-success'>" + "Musician" + "</span>" + topComments[id].artistName + "</li>"
	    + "<li class='list-group-item'>" + "<span class='col-md-3 label label-success'>" + "Music Name" + "</span>" + topComments[id].musicName + "</li>"
  		+ "<li class='list-group-item'>" + "<span class='col-md-3 label label-success'>" + "Comments" + "</span>" + topComments[id].comments + "</li>"
		+ "<li class='list-group-item'>" + "<span class='col-md-3 label label-success'>" + "Album" + "</span>" + topComments[id].albumName + "</li>"
  		+ "</ul>"
		+ "</div>"
		+ "</div>"
		+ "<div class='modal-body'>"
		+ "<audio controls>"
		+ "<source src='" + topComments[id].musicUrl + " type='audio/mpeg'>"
		+ "</audio>"
		+ "</div>"
		+ "</div>"
		+ "</div>");
}
