const writeCompanyInfoToFile = () => {
	const data = [
		{
			"name":"Shadab Shaikh",
			"email":"shadab@gmail.com",
			"mobile":"1234567890"
		},
		{
			"name":"Shadabgfddfgdfg Shaikh",
			"email":"shadab@gmail.com",
			"mobile":"1234567890"
		}
	]
	
	const wb = new xl.Workbook();
	const ws = wb.addWorksheet('Worksheet Name');
	const headingColumnNames = [
		"Name",
		"Email",
		"Mobile",
	]
	
	let headingColumnIndex = 1;
	headingColumnNames.forEach(heading => {
			ws.cell(1, headingColumnIndex++)
					.string(heading)
	});
	
	wb.write('./download/filename.xlsx');
	
	let rowIndex = 2;
	data.forEach( record => {
			let columnIndex = 1;
			Object.keys(record ).forEach(columnName =>{
					ws.cell(rowIndex,columnIndex++)
							.string(record [columnName])
			});
			rowIndex++;
	});
}