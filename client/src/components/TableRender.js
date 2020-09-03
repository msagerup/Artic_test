import React, {useEffect} from 'react'
import { useTable } from 'react-table'
import { useSelector } from 'react-redux';
import * as Sentry from "@sentry/react";
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

function TableRender({ apiData }) {

	// Need to unwind dataset to use in react table.
	const simpleOrgInfo = apiData.map(item => {
		// Do error  Sentry reporting here. (if time)
		// Sentry error reporting
		// if(!item.navn) {
		// 	Sentry.captureMessage(`OrgNumber: ${item.navn} is missing value for 'navn'`);
		// }
		// if(!item.forretningsadresse.kommune) {
		// 	Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'kommune'`);
		// }
		// if(!item.hjemmeside) {
		// 	Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'hjemmeside'`);
		// }
		// if(!item.naeringskode1.kode) {
		// 	Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'naeringskode'`);
		// }
		// if(!item.antallAnsatte) {
		// 	Sentry.captureMessage(`OrgNumber: ${item.organisasjonsnummer} is missing value for 'item.'antallAnsatte'`);
		// }
		
		return {
			navn: item.navn || 'N/A',
			orgNum: item.organisasjonsnummer || 'N/A' ,
			kommune: item.forretningsadresse.kommune || 'N/A' ,
			hjemmeside: item.hjemmeside || 'N/A',
			kode: item.naeringskode1.kode || 'N/A',
			antallAnsatte: item.antallAnsatte 
		}
	})

	const data = React.useMemo(
		() => simpleOrgInfo,
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
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable({
    columns,
    data,
	})

	return (
		<>
      <div>
        <div>
					<IndeterminateCheckbox
						{...getToggleHideAllColumnsProps()}
					/>
					 Vis alle
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
							<input type="checkbox"
								{...column.getToggleHiddenProps()}
							/>{' '}
								{column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
			<table
				{...getTableProps()}
			>
        <thead>
          {headerGroups.map(headerGroup => (
						<tr 
							{...headerGroup.getHeaderGroupProps()}
						>
							{
								headerGroup.headers.map(column => (
									<th {...column.getHeaderProps()}>{column.render('Header')}</th>
								))
							}
            </tr>
          ))}
        </thead>
				<tbody
				 	{...getTableBodyProps()}
				 >
					{
						rows.map((row, i) => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})
					}
        </tbody>
      </table>
      <pre>
				{/* {JSON.stringify(state, null, 2)} */}
			</pre>
    </>	
	)
}



export default TableRender;