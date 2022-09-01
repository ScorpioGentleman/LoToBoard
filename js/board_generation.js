// Init finish array
var arr_board = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Init array to check numbers are ticked  
var ticked_cell = [
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false]
];

// Get random number from min to max
function random_number(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectNumbers() {
	var arr = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
		
	// Init array to count sum of numbers in collumn in range from 4 to 6 
	var count_col = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	
	//  Init array to contain unit numbers
	var arr_unit;
	// Init array to contain numbers follow dozen
	var arr_dozen = [];
	for(i = 0; i < 9; i++){
		arr_unit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		
		// Unit dont need number 0;
		if(i == 0) {
			arr_unit.splice(0, 1);
		}
		
		// Adjust numbers follow dozen to push into arr_dozen  
		for(j = 0; j < arr_unit.length; j++) {
			arr_unit[j] = arr_unit[j] + i * 10;
		}
		
		// Add number 90 to the last dozen
		if(i == 8) {
			arr_unit.push(90);
		}	
		arr_dozen.push(arr_unit);
	}

	// Quantity of number on a row
	var numbers_on_row;

	for(i = 0; i < 9; i++) {
		numbers_on_row = 5;
		while(numbers_on_row > 0) {
			// Random index dozen
			var rand = Math.floor(Math.random() * 9);
			
			// Check current location in arr_board not empty  AND  sum of numbers in count_col not greater than 6
			if(arr[i][rand] == 0 && count_col[rand] < 6) {
				
				// Random index in children array of arr_dozen
				var rand_unit_in_dozen = random_number(0, arr_dozen[rand].length - 1);
				
				// Add element in arr_dozen to arr_board
				arr[i][rand] = arr_dozen[rand][rand_unit_in_dozen];
				// Remove element in arr_dozen
				//console.log("----- " + arr_dozen);
				arr_dozen[rand].splice(rand_unit_in_dozen, 1);
				//console.log(arr_dozen);
				// Increase sum up 1
				count_col[rand]++;
				
				numbers_on_row--;
			}
		}
	}
	
	return arr;
}

function htmlTextGeneration(arr, color) {
	// a area will include 3 rows so count_flag variable will be used to split rows to areas
	var count_flag = 0;
	
	var html_text = "";
	
	for(i = 0; i < arr.length; i++) {
		
		if(count_flag == 0) {
			html_text += "<div class=\"area\">";
		}
		
		for(j = 0; j < arr[i].length; j++) {
			html_text += "<div class=\"cell\" "
			if(arr[i][j] == 0) {
				html_text += "style=\"background:" + color + "\">";
			} else {
				html_text += "><div ";
				html_text += "id=\"" + (i * 10 + j) + "\" "
				if(ticked_cell[i][j]) {
					html_text += "class=\"ticked\" ";
					var red_or_green_color; 
					if(arr[i][j] < 46) {
						red_or_green_color = "#f55182";
					} else {
						red_or_green_color = "#40ad42";
					}
					html_text += "style=\"border-color:" + red_or_green_color + "; color:" + red_or_green_color + "\" ";
					
				} else {
					html_text += "class=\"unticked\" ";
				}
				html_text += "onClick=\"tick(this.id)\">" + arr[i][j];
				html_text += "</div>";
			}
			html_text += "</div>";
		}
		
		count_flag++;
		if(count_flag == 3) {
			count_flag = 0;
			html_text += "</div>";
		}
	}
	
	return html_text;
}

// Select random one of all colors are listed
function randomColor() {
	var color = ["#fce00a", "#fc4c12", "#17bafa", "#50c750", "#875139", "#846697", "#e9a33b", "#a8ce37"];
	return color[Math.floor(Math.random() * color.length)];
}

var bgcolor = randomColor();

function tick(row_and_col){
	// get row of cell in array
	var row = Math.floor(row_and_col / 10);
	// get collumn of cell in array
	var col = row_and_col % 10;
	
	// change value of variable from True to False and from False to True
	ticked_cell[row][col] = !ticked_cell[row][col];
	// Re-update LoTo 
	document.getElementById("board").innerHTML = htmlTextGeneration(arr_board, bgcolor);
}

arr_board = selectNumbers();

//console.log(html_text);
document.getElementById("board").innerHTML = htmlTextGeneration(arr_board, bgcolor);
