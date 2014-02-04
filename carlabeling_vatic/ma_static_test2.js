var tracks = null;


function gup(name){
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );

    if( results == null)
	return "";
    else
	return results[1];
}

function init_objectui() {

    imgname = gup("imgname");
    console.log("get image name: " + imgname);

    var videoframe = $("#videoframe");

    // videoframe.css("width", "1024px");
    // videoframe.css("height", "720px");

    videoframe.css("width", "1280px");
    videoframe.css("height", "960px");

    var job = new Job();

    job.slug = "Slug: string job id ";
    job.start = 0;
    job.stop = 2;

    job.width = 1280;
    //job.height = 720;
    job.height = 960;

    job.skip = 0;
    job.perobject = 0;
    job.completion = 0;
    job.blowradius = 0;
    job.jobid = 5;

    job.labels = new Array();
    job.labels[0] = "Car";

    job.attributes = [];
    job.training = 0;

    job.frameurl = function(i)
    {
	//return 'tmp/00000200.jpg';

	return imgname;

        // folder1 = parseInt(Math.floor(i / 100));
        // folder2 = parseInt(Math.floor(i / 10000));
        // return "frames/" + me.slug + 
        //     "/" + folder2 + "/" + folder1 + "/" + parseInt(i) + ".jpg";
    }

    var player = new VideoPlayer(videoframe, job);

    $("#topbar").append("<div id='newobjectcontainer'><div class='button' id='newobjectbutton'>New Object</div></div>");
    $("<div id='objectcontainer'></div>").appendTo("#sidebar");

    //var tracks = new TrackCollection(player, job);
    tracks = new TrackCollection(player, job);

    var objectui = new TrackObjectUI($("#newobjectbutton"), $("#objectcontainer"), videoframe, job, player, tracks);

    ui_setupkeyboardshortcuts(job, player, tracks);
    ui_setupbuttons(job, player, tracks);
}

// what to submit to AMT server
function get_results_string(){
    imgname = gup("imgname");
    var result = "label_cars, " + imgname;

    // for (var tidx = 0; tidx < tracks.tracks.length; ++tidx) {
    // 	console.log("track " + tidx + ": " + tracks.tracks[tidx].label);
    // }
    
    for (var tidx = 0; tidx < tracks.tracks.length; ++tidx) {
	console.log("track: " + tidx + ", deleted: " + tracks.tracks[tidx].deleted);

	if (!tracks.tracks[tidx].deleted) {
    	    result += "," + tracks.tracks[tidx].journal.annotations[0].xtl; 
    	    result += "," + tracks.tracks[tidx].journal.annotations[0].ytl; 
    	    result += "," + tracks.tracks[tidx].journal.annotations[0].xbr; 
    	    result += "," + tracks.tracks[tidx].journal.annotations[0].ybr; 
    	    result += "," + Number(tracks.tracks[tidx].journal.annotations[0].occluded); 
    	    result += "," + Number(tracks.tracks[tidx].journal.annotations[0].outside); 
	}
    }

    console.log("result: " + result);
    return result;
}

// grab the results and submit to the server
function submitResults(){
    var results = get_results_string();
    document.getElementById('object_bbox').value = results;

    document.forms["mturk_form"].submit();
}
