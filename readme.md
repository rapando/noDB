!!IMPORTANT!!
in the js files
js/admin.js
  /main.js

 just after 
 	jq(document).ready(function() {
 	//here
 }) 

 change domainlink to the path to your server. For example if you copied the noDB folder (inside server folder) into the root folderof your localserver, then set the variable to
 'http://localhost';
 if you copied it into a folder eg 'myProjects'
 then set the variable to 'http://localhost/myProjects';
However, dont change any variable name

______________
/This is a system where the information is stored online, in JSON formats in .json files. The files will be created with PHP if they dont exist. The system holds the views of users on a certain topic managed by an admin.
-----
The tables are not related as in a relational database. However, the information can be related using indexes in the array. In any case an element in array is deleted, then the indexes are rearranged, then the unique user IDs (which are auto incremented) are used. 
----

______

Rapando Samson and Daniel Warui
BSc Computer Science, The University of Nairobi (2015-2018)