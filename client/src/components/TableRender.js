import React from 'react'
import { useTable } from 'react-table'
import PropTypes from 'prop-types';
import * as Sentry from "@sentry/react";
import ExcelExport from './ExcelExport'

// Have to do this, theme is not working.
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


function TableRender({ apiData }) {
	// Need to unwind dataset to use in react table.
	const simpleOrgInfo = apiData.map(item => {
		// Do error  Sentry reporting here. (if time)
		// Sentry error reporting
		if(!item.navn) {
			Sentry.captureMessage(`OrgNumber: ${item.navn} is missing value for 'navn'`);
		}
		if(!item.forretningsadresse.kommune) {
			Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'kommune'`);
		}
		if(!item.hjemmeside) {
			Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'hjemmeside'`);
		}
		if(!item.naeringskode1.kode) {
			Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'naeringskode'`);
		}
		if(!item.antallAnsatte) {
			Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'item.'antallAnsatte'`);
		}
		
		return {
			navn: item.navn || 'N/A',
			orgNum: item.organisasjonsnummer || 'N/A' ,
			kommune: item.forretningsadresse.kommune || 'N/A' ,
			hjemmeside: item.hjemmeside ? item.hjemmeside : 'N/A',
			kode: item.naeringskode1 ? item.naeringskode1.kode : 'N/A',
			antallAnsatte: item.antallAnsatte 
		}
	})
	
	const data = React.useMemo(
		() => simpleOrgInfo,
	// eslint-disable-next-line
		[]
	)

	const columns = React.useMemo(
		() => [
			{
				Header: 'Organisasjonsnummer',
				accessor: 'orgNum', 
			}, 
			{
				Header: 'Selskapsnavn',
				accessor: 'navn',
			},
			{
				Header: 'Kommune',
				accessor: 'kommune',
			},
			{
				Header: 'Hjemmeside',
				accessor: 'hjemmeside',
			},
			{
				Header: 'Næringskode',
				accessor: 'kode',
			},
			{
				Header: 'Ansatte',
				accessor: 'antallAnsatte',
			},
		],
		[]
	)

	const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
	})


	return (
		<div>
		<MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
		<ExcelExport data={simpleOrgInfo} />
		</div>
	)
}
TableRender.propTypes = {
	apiData: PropTypes.array
}

export default TableRender;