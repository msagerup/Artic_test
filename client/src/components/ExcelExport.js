import React from 'react'
import ReactExport from "react-export-excel";
import PropTypes from 'prop-types';
import {
  Button,
} from '@material-ui/core';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function ExcelExport({data}) {
	const dataSet = data;
  
	return (
		<ExcelFile element={
			<Button
				color="secondary"
				size="small"
				variant="contained"
				style={{marginTop: '20px'}}
				>
				Download Data
			</Button>
		}>
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