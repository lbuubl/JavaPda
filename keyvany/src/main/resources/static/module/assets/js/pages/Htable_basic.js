/* ------------------------------------------------------------------------------
*
*  # Handsontable - Excel-like tables with extensive funtionality
*
*  Specific JS code additions for handsontable_basic.html page
*
*  Version: 1.0
*  Latest update: Nov 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function() {

    // Define element
    var hot_basic = document.getElementById('hot_basic');

    // Initialize with options
    var hot_basic_init = new Handsontable(hot_basic, {
        data: Handsontable.helper.createSpreadsheetData(1200, 48),
    });


});
