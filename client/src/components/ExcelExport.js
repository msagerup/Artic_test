import React from 'react'
import ReactExport from "react-export-excel";
import PropTypes from 'prop-types';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function ExcelExport({data}) {
	const dataSet = data;
  



	return (
		<ExcelFile element={<button>Download Data</button>}>
			<ExcelSheet data={dataSet} name="Business lookup">
				<ExcelColumn label="Organisasjonsnummer" value="orgNum"/>
				<ExcelColumn label="Selskapsnavn" value="navn"/>
				<ExcelColumn label="Kommune" value="kommune"/>
				<ExcelColumn label="Hjemmeside" value="hjemmeside" />
				<ExcelColumn label="Næringskode" value="kode"/>
				<ExcelColumn label="Ansatte" value="antallAnsatte"/>
				</ExcelSheet>
		</ExcelFile>
	)
}

ExcelExport.propTypes = {
	data: PropTypes.array
}

export default ExcelExport;