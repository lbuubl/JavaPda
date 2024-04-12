/* ------------------------------------------------------------------------------
*
*  # Plupload multiple file uploader
*
*  Specific JS code additions for uploader_plupload.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */
	var traverseFileTree, map = {};

$(function() {

   


    // Setup html5 version
    $("#simpleUpload").pluploadQueue({

        // General settings
		container: 'simpleUpload',
	    drop_element: 'simpleUpload',
        runtimes: 'html5',
        url: 'assets/demo_data/uploader/plupload.json',
        chunk_size: '300Kb',
        unique_names: true,
        filters: {
            mime_types: [{
                title: "Image files",
                extensions: "jpg,gif,png"
            }]
        },

        // Resize images on clientside if we can
        resize: {
            width: 320,
            height: 240,
            quality: 90
        },
		init: {
			PostInit: function() {
				document.getElementById('plupload_start').onclick = function() {
					uploader.start();
					return false;
				};
			},
			BeforeUpload: function (up, file) {
				// send relativePath along
				if(map[file.name] !== undefined) {
					up.setOption('multipart_params', {
						relativePath: map[file.name].shift()
					});
				}
			},
			 FilesAdded: function(up, files) {
				//log('[FilesAdded]'); // Called when files are added to queue

				plupload.each(files, function(file) {
				///	log('  File:', file);
					 console.log('Relative path: ' + file.relativePath)
				});
			}
		}
    });

/*
uploader  =$("#simpleUpload").pluploadQueue({
//uploader = new plupload.Uploader({
	runtimes : 'html5',
	browse_button : 'btnUploadImage',
	url: 'assets/demo_data/uploader/plupload.json',
	init: {
		PostInit: function() {
			document.getElementById('plupload_start').onclick = function() {
				uploader.start();
				return false;
			};
		},
		BeforeUpload: function (up, file) {
			// send relativePath along
			if(map[file.name] !== undefined) {
				up.setOption('multipart_params', {
					relativePath: map[file.name].shift()
				});
			}
		},
		 FilesAdded: function(up, files) {
			log('[FilesAdded]'); // Called when files are added to queue

			plupload.each(files, function(file) {
			///	log('  File:', file);
				 console.log('Relative path: ' + file.relativePath)
			});
		}
	}
});
uploader.init();
*/
    // Write log
	/*
    function log() {
        var str = "";

        plupload.each(arguments, function(arg) {
            var row = "";

            if (typeof(arg) != "string") {
                plupload.each(arg, function(value, key) {

                    // Convert items in File objects to human readable form
                    if (arg instanceof plupload.File) {

                        // Convert status to human readable
                        switch (value) {
                            case plupload.QUEUED:
                            value = 'QUEUED';
                            break;

                            case plupload.UPLOADING:
                            value = 'UPLOADING';
                            break;

                            case plupload.FAILED:
                            value = 'FAILED';
                            break;

                            case plupload.DONE:
                            value = 'DONE';
                            break;
                        }
                    }

                    if (typeof(value) != "function") {
                        row += (row ? ', ': '') + key + '=' + value;
                    }
                });

                str += row + " ";
            }
            else {
                str += arg + " ";
            }
        });

        var log = $('#log');
        log.append(str + "<br>");
        log.scrollTop(log[0].scrollHeight);
    }
    */

	
	// all relative paths are built here
	traverseFileTree = function (item, path) {
		var dirReader = null;
		path = path || '';
		if (item.isFile) {
			item.file(function(file) {
				// careful here, could be several files of the same name
				// we assume files will be in the same order here than in plupload
				if(map[file.name] === undefined) {
					map[file.name] = [];
				}
				map[file.name].push(path);
			});
		} else if (item.isDirectory) {
			dirReader = item.createReader();
			dirReader.readEntries(function (entries) {
				var n = 0;
				for (n = 0; n < entries.length; n++) {
					traverseFileTree(entries[n], path + item.name + "/");
					console.log(path + item.name + "/");
				}
			});
		}
	};
	 
	// bind another handler to the drop event to build an object representing the folder structure
	document.getElementById('simpleUpload').addEventListener('drop', function(e) {
		var items = e.dataTransfer.items, n, item;
		for(n = 0; n < items.length; n++) {
			item = items[n].webkitGetAsEntry();
			if(item) {
				traverseFileTree(item);
			}
		}
	}, false);

});
